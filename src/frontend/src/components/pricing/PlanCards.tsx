import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from '@tanstack/react-router';

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for trying out the platform',
    features: [
      'Up to 1 minute videos',
      '720p quality',
      '3 videos per month',
      'Basic anime styles',
      'Community support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Creator',
    price: '$29',
    description: 'For serious content creators',
    features: [
      'Up to 10 minute videos',
      'Up to 2K quality',
      'Unlimited videos',
      'All anime styles',
      'Custom characters',
      'Priority support',
    ],
    cta: 'Start Creating',
    popular: true,
  },
  {
    name: 'Studio',
    price: '$99',
    description: 'Professional production quality',
    features: [
      'Up to 20 minute videos',
      '4K quality',
      'Unlimited videos',
      'All anime styles',
      'Custom characters',
      'Advanced voice options',
      'Priority rendering',
      'Dedicated support',
    ],
    cta: 'Go Professional',
    popular: false,
  },
];

export default function PlanCards() {
  const navigate = useNavigate();

  return (
    <div className="grid gap-8 md:grid-cols-3">
      {plans.map((plan) => (
        <Card
          key={plan.name}
          className={`surface-card relative ${
            plan.popular ? 'border-purple-500/50 shadow-lg shadow-purple-500/20' : ''
          }`}
        >
          {plan.popular && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="rounded-full bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-1 text-sm font-medium text-white">
                Most Popular
              </span>
            </div>
          )}
          <CardHeader>
            <CardTitle className="text-2xl">{plan.name}</CardTitle>
            <CardDescription>{plan.description}</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">{plan.price}</span>
              <span className="text-muted-foreground">/month</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-purple-400" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <Button
              className={plan.popular ? 'gradient-cta w-full' : 'w-full'}
              variant={plan.popular ? 'default' : 'outline'}
              onClick={() => navigate({ to: '/auth' })}
            >
              {plan.cta}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
