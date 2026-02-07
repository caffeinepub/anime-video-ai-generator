import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface VideoJob {
    id: string;
    status: VideoJobStatus;
    duration: bigint;
    thumbnail?: ExternalBlob;
    owner: Principal;
    quality: string;
    createdAt: bigint;
    resultUrl?: string;
    updatedAt: bigint;
    style: string;
    prompt: string;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum Variant_completed_failed {
    completed = "completed",
    failed = "failed"
}
export enum VideoJobStatus {
    pending = "pending",
    completed = "completed",
    processing = "processing",
    failed = "failed"
}
export interface backendInterface {
    addPublicVideo(jobId: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    completeVideoJob(jobId: string, resultUrl: string, status: Variant_completed_failed): Promise<void>;
    createVideoJob(prompt: string, style: string, duration: bigint, quality: string, thumbnail: ExternalBlob | null): Promise<string>;
    deleteVideoJob(jobId: string): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getMyVideoJobs(): Promise<Array<VideoJob>>;
    getPublicVideos(): Promise<Array<VideoJob>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getVideoJob(jobId: string): Promise<VideoJob>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
