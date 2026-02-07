import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { type VideoJob } from '@/backend';

export function useGetMyVideoJobs() {
  const { actor, isFetching } = useActor();

  return useQuery<VideoJob[]>({
    queryKey: ['myVideoJobs'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyVideoJobs();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 5000, // Poll every 5 seconds for live updates
  });
}

export function useGetPublicVideos() {
  const { actor, isFetching } = useActor();

  return useQuery<VideoJob[]>({
    queryKey: ['publicVideos'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPublicVideos();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetVideoJob(jobId: string | null, options?: { polling?: boolean }) {
  const { actor, isFetching } = useActor();

  return useQuery<VideoJob | null>({
    queryKey: ['videoJob', jobId],
    queryFn: async () => {
      if (!actor || !jobId) return null;
      return actor.getVideoJob(jobId);
    },
    enabled: !!actor && !isFetching && !!jobId,
    refetchInterval: options?.polling ? 2000 : false, // Poll every 2 seconds if enabled
  });
}

export function useCreateVideoJob() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      prompt: string;
      style: string;
      duration: number;
      quality: string;
      thumbnail?: any;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createVideoJob(
        params.prompt,
        params.style,
        BigInt(params.duration),
        params.quality,
        params.thumbnail || null
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myVideoJobs'] });
    },
  });
}
