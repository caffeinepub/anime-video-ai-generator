import { useSeo } from '@/hooks/useSeo';
import JobHistoryList from '@/components/dashboard/JobHistoryList';
import { useGetCallerUserProfile } from '@/hooks/useUserProfile';

export default function DashboardPage() {
  const { data: userProfile } = useGetCallerUserProfile();

  useSeo({
    title: 'Dashboard - Anime Video AI Generator',
    description: 'Manage your anime video generation history and downloads.',
  });

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold md:text-4xl">
          Welcome back, {userProfile?.name || 'Creator'}!
        </h1>
        <p className="text-muted-foreground">Manage your anime video creations</p>
      </div>

      <JobHistoryList />
    </div>
  );
}
