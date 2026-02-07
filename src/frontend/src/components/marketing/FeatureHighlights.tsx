import { Wand2, Eye, Zap, Palette, Users, Music } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: Wand2,
    title: 'AI-Powered Generation',
    description: 'Transform your story prompts into stunning anime videos with advanced AI technology.',
  },
  {
    icon: Eye,
    title: 'Storyboard Preview',
    description: 'Review and refine your video storyboard before final generation for perfect results.',
  },
  {
    icon: Zap,
    title: 'Multiple Quality Options',
    description: 'Generate videos in 720p, 1080p, 2K, or stunning 4K quality for any platform.',
  },
  {
    icon: Palette,
    title: 'Diverse Anime Styles',
    description: 'Choose from Naruto, One Piece, Demon Slayer, Makoto Shinkai, Studio Ghibli, or custom styles.',
  },
  {
    icon: Users,
    title: 'Custom Characters',
    description: 'Upload photos, select presets, or generate characters from text descriptions.',
  },
  {
    icon: Music,
    title: 'Voice & Music',
    description: 'Add multilingual voices (Hindi, English, Japanese) and cinematic music to your videos.',
  },
];

export default function FeatureHighlights() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Powerful Features for Creators</h2>
          <p className="text-lg text-muted-foreground">Everything you need to create professional anime videos</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="surface-card border-border/50 transition-all hover:border-purple-500/50">
              <CardHeader>
                <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                  <feature.icon className="h-6 w-6 text-purple-400" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
