import { useSeo } from '@/hooks/useSeo';
import LoginButton from '@/components/auth/LoginButton';
import ProfileSetupDialog from '@/components/auth/ProfileSetupDialog';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '@/hooks/useUserProfile';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

export default function AuthPage() {
  const { identity } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const isAuthenticated = !!identity;

  useSeo({
    title: 'Sign In - Anime Video AI Generator',
    description: 'Sign in to create and manage your anime videos.',
  });

  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  return (
    <div className="container flex min-h-[calc(100vh-8rem)] items-center justify-center py-12">
      <Card className="surface-card w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20">
            <Sparkles className="h-8 w-8 text-purple-400" />
          </div>
          <CardTitle className="text-2xl">Welcome to Anime Video AI</CardTitle>
          <CardDescription>
            {isAuthenticated
              ? `Signed in as ${userProfile?.name || 'User'}`
              : 'Sign in to start creating amazing anime videos'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <LoginButton />
          {isAuthenticated && userProfile && (
            <div className="rounded-lg border border-border/50 bg-card/50 p-4">
              <p className="text-sm text-muted-foreground">
                You're all set! Visit the Generate page to create your first anime video.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {showProfileSetup && <ProfileSetupDialog />}
    </div>
  );
}
