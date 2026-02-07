import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Menu, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '@/hooks/useUserProfile';

export default function TopNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const isAuthenticated = !!identity;

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Generate', path: '/generate' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Pricing', path: '/pricing' },
  ];

  const handleAuthClick = () => {
    navigate({ to: '/auth' });
    setMobileOpen(false);
  };

  const handleDashboardClick = () => {
    navigate({ to: '/dashboard' });
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/assets/generated/logo.dim_512x512.png" alt="Anime Video AI" className="h-10 w-10" />
          <span className="hidden font-bold text-xl sm:inline-block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Anime Video AI
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: 'text-foreground' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Button variant="ghost" onClick={handleDashboardClick}>
                {userProfile?.name || 'Dashboard'}
              </Button>
              <Button onClick={handleAuthClick} className="gradient-cta">
                <Sparkles className="mr-2 h-4 w-4" />
                Account
              </Button>
            </>
          ) : (
            <Button onClick={handleAuthClick} className="gradient-cta">
              Sign In
            </Button>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
                  activeProps={{ className: 'text-foreground' }}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 flex flex-col gap-2">
                {isAuthenticated ? (
                  <>
                    <Button variant="outline" onClick={handleDashboardClick} className="w-full">
                      {userProfile?.name || 'Dashboard'}
                    </Button>
                    <Button onClick={handleAuthClick} className="gradient-cta w-full">
                      Account
                    </Button>
                  </>
                ) : (
                  <Button onClick={handleAuthClick} className="gradient-cta w-full">
                    Sign In
                  </Button>
                )}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
