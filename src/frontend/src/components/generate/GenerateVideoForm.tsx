import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Wand2 } from 'lucide-react';
import { DURATIONS, QUALITIES, ANIME_STYLES, PRESET_CHARACTERS, MUSIC_STYLES, VOICE_LANGUAGES } from './presets';
import { type VideoJobConfig } from './types';

interface GenerateVideoFormProps {
  onSubmit: (config: VideoJobConfig) => void;
  initialConfig?: VideoJobConfig | null;
}

export default function GenerateVideoForm({ onSubmit, initialConfig }: GenerateVideoFormProps) {
  const [prompt, setPrompt] = useState(initialConfig?.prompt || '');
  const [duration, setDuration] = useState(initialConfig?.duration || 60);
  const [quality, setQuality] = useState(initialConfig?.quality || '1080p');
  const [style, setStyle] = useState(initialConfig?.style || 'naruto');
  const [customStyle, setCustomStyle] = useState(initialConfig?.customStyle || '');
  const [characterOption, setCharacterOption] = useState<'upload' | 'preset' | 'text'>(
    initialConfig?.characterOption || 'preset'
  );
  const [characterImage, setCharacterImage] = useState<File | undefined>(initialConfig?.characterImage);
  const [characterPreset, setCharacterPreset] = useState(initialConfig?.characterPreset || 'warrior');
  const [characterDescription, setCharacterDescription] = useState(initialConfig?.characterDescription || '');
  const [voiceGender, setVoiceGender] = useState<'male' | 'female'>(initialConfig?.voiceGender || 'male');
  const [voiceLanguage, setVoiceLanguage] = useState<'hindi' | 'english' | 'japanese'>(
    initialConfig?.voiceLanguage || 'english'
  );
  const [musicStyle, setMusicStyle] = useState(initialConfig?.musicStyle || 'cinematic');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      alert('Please enter a story prompt');
      return;
    }

    const config: VideoJobConfig = {
      prompt,
      duration,
      quality,
      style,
      customStyle: style === 'custom' ? customStyle : undefined,
      characterOption,
      characterImage,
      characterPreset: characterOption === 'preset' ? characterPreset : undefined,
      characterDescription: characterOption === 'text' ? characterDescription : undefined,
      voiceGender,
      voiceLanguage,
      musicStyle,
    };

    onSubmit(config);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Story Prompt */}
      <Card className="surface-card">
        <CardHeader>
          <CardTitle>Story Prompt</CardTitle>
          <CardDescription>Describe the anime video you want to create</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Enter your story prompt here... e.g., 'A young ninja discovers a hidden power and must save their village from an ancient evil'"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            className="resize-none"
          />
        </CardContent>
      </Card>

      {/* Video Settings */}
      <Card className="surface-card">
        <CardHeader>
          <CardTitle>Video Settings</CardTitle>
          <CardDescription>Configure duration and quality</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Duration</Label>
              <Select value={duration.toString()} onValueChange={(v) => setDuration(Number(v))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DURATIONS.map((d) => (
                    <SelectItem key={d.value} value={d.value.toString()}>
                      {d.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Quality</Label>
              <Select value={quality} onValueChange={setQuality}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {QUALITIES.map((q) => (
                    <SelectItem key={q.value} value={q.value}>
                      {q.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Anime Style */}
      <Card className="surface-card">
        <CardHeader>
          <CardTitle>Anime Style</CardTitle>
          <CardDescription>Choose your preferred animation style</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select value={style} onValueChange={setStyle}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ANIME_STYLES.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {style === 'custom' && (
            <div className="space-y-2">
              <Label>Custom Style Description</Label>
              <Input
                placeholder="Describe your custom anime style..."
                value={customStyle}
                onChange={(e) => setCustomStyle(e.target.value)}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Character Options */}
      <Card className="surface-card">
        <CardHeader>
          <CardTitle>Character Options</CardTitle>
          <CardDescription>Define your main character</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={characterOption} onValueChange={(v) => setCharacterOption(v as any)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="preset">Preset</TabsTrigger>
              <TabsTrigger value="upload">Upload</TabsTrigger>
              <TabsTrigger value="text">Generate</TabsTrigger>
            </TabsList>
            <TabsContent value="preset" className="space-y-4">
              <Label>Choose a preset character</Label>
              <Select value={characterPreset} onValueChange={setCharacterPreset}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PRESET_CHARACTERS.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </TabsContent>
            <TabsContent value="upload" className="space-y-4">
              <Label>Upload character photo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setCharacterImage(e.target.files?.[0])}
              />
            </TabsContent>
            <TabsContent value="text" className="space-y-4">
              <Label>Describe your character</Label>
              <Textarea
                placeholder="e.g., A teenage girl with long silver hair, blue eyes, wearing a magical school uniform..."
                value={characterDescription}
                onChange={(e) => setCharacterDescription(e.target.value)}
                rows={3}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Voice Options */}
      <Card className="surface-card">
        <CardHeader>
          <CardTitle>Voice Options</CardTitle>
          <CardDescription>Select voice gender and language</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Voice Gender</Label>
            <RadioGroup value={voiceGender} onValueChange={(v) => setVoiceGender(v as any)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male" className="font-normal cursor-pointer">
                  Male
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female" className="font-normal cursor-pointer">
                  Female
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label>Language</Label>
            <Select value={voiceLanguage} onValueChange={(v) => setVoiceLanguage(v as any)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {VOICE_LANGUAGES.map((l) => (
                  <SelectItem key={l.value} value={l.value}>
                    {l.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Music Options */}
      <Card className="surface-card">
        <CardHeader>
          <CardTitle>Music Style</CardTitle>
          <CardDescription>Choose background music mood</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={musicStyle} onValueChange={setMusicStyle}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {MUSIC_STYLES.map((m) => (
                <SelectItem key={m.value} value={m.value}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Button type="submit" size="lg" className="gradient-cta w-full">
        <Wand2 className="mr-2 h-5 w-5" />
        Preview Storyboard
      </Button>
    </form>
  );
}
