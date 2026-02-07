import List "mo:core/List";
import Int "mo:core/Int";
import Time "mo:core/Time";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Storage "blob-storage/Storage";
import AccessControl "authorization/access-control";

module {
  type VideoJobStatus = { #pending; #processing; #completed; #failed };

  type OldVideoJob = {
    id : Text;
    owner : Principal;
    title : Text;
    style : Text;
    duration : Nat;
    quality : Text;
    status : VideoJobStatus;
    createdAt : Int;
    updatedAt : Int;
    resultUrl : ?Text;
    thumbnail : ?Storage.ExternalBlob;
  };

  type NewVideoJob = {
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

  // Map from OldVideoJob to NewVideoJob
  func mapJobs(oldJob : OldVideoJob) : NewVideoJob {
    let prompt = oldJob.title;
    { oldJob with prompt };
  };

  // Function to replace "title" with "prompt" in NewVideoJob
  func replaceTitleWithPrompt(job : NewVideoJob) : NewVideoJob {
    { job with prompt = job.prompt };
  };

  type OldActor = {
    videoJobs : Map.Map<Text, OldVideoJob>;
    publicVideos : List.List<Text>;
    userProfiles : Map.Map<Principal, { name : Text }>;
    accessControlState : AccessControl.AccessControlState;
  };

  type NewActor = {
    videoJobs : Map.Map<Text, NewVideoJob>;
    publicVideos : List.List<Text>;
    userProfiles : Map.Map<Principal, { name : Text }>;
    accessControlState : AccessControl.AccessControlState;
  };

  public func run(old : OldActor) : NewActor {
    // Apply OldVideoJob -> NewVideoJob mapping with "title" -> "prompt"
    let newJobs = old.videoJobs.map<Text, OldVideoJob, NewVideoJob>(
      func(_k, v) { mapJobs(v) }
    );

    // Apply "prompt" transformations to all jobs
    let finalJobList = newJobs.toArray().map(
      func((key, value)) { (key, replaceTitleWithPrompt(value)) }
    );

    // Reconstruct the videoJobs map with finalJobList, using copy method
    let finalJobs = if (finalJobList.size() > 0) {
      Map.fromArray<Text, NewVideoJob>(finalJobList);
    } else {
      Map.empty<Text, NewVideoJob>();
    };

    {
      old with
      videoJobs = finalJobs
    };
  };
};
