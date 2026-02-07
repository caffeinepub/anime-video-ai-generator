import { useNavigate } from '@tanstack/react-router';
import { Sparkles, Wand2, Film, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useSeo } from '@/hooks/useSeo';
import FeatureHighlights from '@/components/marketing/FeatureHighlights';

export default function HomePage() {
  const navigate = useNavigate();
  useSeo({
    title: 'Anime Video AI Generator - Create Stunning 4K Anime Videos',
    description:
      'Generate long anime videos up to 4K quality using AI. Choose from multiple anime styles, add custom characters, voices in multiple languages, and cinematic music. Create your anime masterpiece today.',
  });

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(/assets/generated/hero-bg.dim_1920x1080.png)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        <div className="container relative py-24 md:py-32 lg:py-40">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm text-purple-300">
              <Sparkles className="h-4 w-4" />
              AI-Powered Anime Generation
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Create Stunning{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Anime Videos
              </span>{' '}
              with AI
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Generate long-form anime videos up to 4K quality. Choose your style, characters, voices, and music. Turn
              your stories into breathtaking anime masterpieces in minutes.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="gradient-cta text-lg" onClick={() => navigate({ to: '/generate' })}>
                <Wand2 className="mr-2 h-5 w-5" />
                Start Creating
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate({ to: '/gallery' })}>
                <Film className="mr-2 h-5 w-5" />
                View Gallery
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <FeatureHighlights />

      {/* CTA Section */}
      <section className="border-t border-border/40 bg-gradient-to-b from-purple-950/20 to-blue-950/20 py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to Create Your Anime?</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Join thousands of creators bringing their stories to life with AI-powered anime generation.
            </p>
            <Button size="lg" className="gradient-cta text-lg" onClick={() => navigate({ to: '/generate' })}>
              <Sparkles className="mr-2 h-5 w-5" />
              Get Started Free
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
