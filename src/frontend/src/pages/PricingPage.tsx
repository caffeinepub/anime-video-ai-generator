import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useNavigate } from '@tanstack/react-router';
import { useSeo } from '@/hooks/useSeo';
import PlanCards from '@/components/pricing/PlanCards';
import PlanComparisonTable from '@/components/pricing/PlanComparisonTable';

export default function PricingPage() {
  const navigate = useNavigate();
  useSeo({
    title: 'Pricing Plans - Anime Video AI Generator',
    description: 'Choose the perfect plan for your anime video creation needs. From free to professional tiers with 4K quality.',
  });

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Simple, Transparent Pricing</h1>
          <p className="text-lg text-muted-foreground">
            Choose the plan that fits your creative needs
          </p>
        </div>

        <PlanCards />

        <div className="mt-16">
          <h2 className="mb-8 text-center text-2xl font-bold">Compare Plans</h2>
          <PlanComparisonTable />
        </div>
      </div>
    </div>
  );
}
