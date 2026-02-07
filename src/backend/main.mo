import List "mo:core/List";
import Text "mo:core/Text";
import Int "mo:core/Int";
import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import Migration "migration";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

(with migration = Migration.run)
actor {
  type VideoJobStatus = { #pending; #processing; #completed; #failed };

  type VideoJob = {
    id : Text;
    owner : Principal;
    prompt : Text;
    style : Text;
    duration : Nat;
    quality : Text;
    status : VideoJobStatus;
    createdAt : Int;
    updatedAt : Int;
    resultUrl : ?Text;
    thumbnail : ?Storage.ExternalBlob;
  };

  module VideoJob {
    public func compare(job1 : VideoJob, job2 : VideoJob) : Order.Order {
      Text.compare(job1.id, job2.id);
    };

    public func compareByCreatedAt(job1 : VideoJob, job2 : VideoJob) : Order.Order {
      switch (Int.compare(job1.createdAt, job2.createdAt)) {
        case (#equal) { job1.id.compare(job2.id) };
        case (order) { order };
      };
    };
  };

  public type UserProfile = {
    name : Text;
  };

  // Initialize the user system state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  // Persistent storage for video jobs and user profiles
  let videoJobs = Map.empty<Text, VideoJob>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  let publicVideos = List.empty<Text>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func createVideoJob(
    prompt : Text,
    style : Text,
    duration : Nat,
    quality : Text,
    thumbnail : ?Storage.ExternalBlob,
  ) : async Text {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can create video jobs");
    };
    let jobId = "VJ-" # Time.now().toText();
    let now = Time.now();

    let newJob : VideoJob = {
      id = jobId;
      owner = caller;
      prompt;
      style;
      duration;
      quality;
      status = #pending;
      createdAt = now;
      updatedAt = now;
      resultUrl = null;
      thumbnail;
    };

    videoJobs.add(jobId, newJob);
    jobId;
  };

  public shared ({ caller }) func completeVideoJob(jobId : Text, resultUrl : Text, status : { #completed : (); #failed : () }) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can complete video jobs");
    };
    switch (videoJobs.get(jobId)) {
      case (null) { Runtime.trap("Job not found") };
      case (?job) {
        let updatedJob = { job with resultUrl = ?resultUrl; status };
        videoJobs.add(jobId, updatedJob);
      };
    };
  };

  public query ({ caller }) func getVideoJob(jobId : Text) : async VideoJob {
    switch (videoJobs.get(jobId)) {
      case (null) { Runtime.trap("Job not found") };
      case (?job) {
        if (caller != job.owner and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only view your own jobs");
        };
        job;
      };
    };
  };

  public query ({ caller }) func getMyVideoJobs() : async [VideoJob] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their video jobs");
    };
    videoJobs.values().toArray().filter(func(job) { job.owner == caller });
  };

  public query ({ caller }) func getPublicVideos() : async [VideoJob] {
    publicVideos.values().toArray().map(
      func(jobId) {
        switch (videoJobs.get(jobId)) {
          case (null) { Runtime.trap("Job not found") };
          case (?job) { job };
        };
      }
    );
  };

  public shared ({ caller }) func addPublicVideo(jobId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add public videos");
    };
    if (not videoJobs.containsKey(jobId)) {
      Runtime.trap("Job not found");
    };
    publicVideos.add(jobId);
  };

  public shared ({ caller }) func deleteVideoJob(jobId : Text) : async () {
    switch (videoJobs.get(jobId)) {
      case (null) { Runtime.trap("Job not found") };
      case (?job) {
        if (caller != job.owner and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only delete your own jobs");
        };
        videoJobs.remove(jobId);
        let filteredPublicVideos = publicVideos.filter(func(id) { id != jobId });
        publicVideos.clear();
        publicVideos.addAll(filteredPublicVideos.values());
      };
    };
  };
};
