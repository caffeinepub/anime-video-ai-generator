import { Check, X } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const features = [
  { name: 'Max Video Duration', free: '1 minute', creator: '10 minutes', studio: '20 minutes' },
  { name: 'Video Quality', free: '720p', creator: 'Up to 2K', studio: 'Up to 4K' },
  { name: 'Videos per Month', free: '3', creator: 'Unlimited', studio: 'Unlimited' },
  { name: 'Anime Styles', free: 'Basic', creator: 'All', studio: 'All' },
  { name: 'Custom Characters', free: false, creator: true, studio: true },
  { name: 'Voice Options', free: 'Basic', creator: 'Standard', studio: 'Advanced' },
  { name: 'Music Library', free: 'Limited', creator: 'Full', studio: 'Full' },
  { name: 'Priority Rendering', free: false, creator: false, studio: true },
  { name: 'Support', free: 'Community', creator: 'Priority', studio: 'Dedicated' },
];

export default function PlanComparisonTable() {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Feature</TableHead>
            <TableHead>Free</TableHead>
            <TableHead>Creator</TableHead>
            <TableHead>Studio</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {features.map((feature) => (
            <TableRow key={feature.name}>
              <TableCell className="font-medium">{feature.name}</TableCell>
              <TableCell>
                {typeof feature.free === 'boolean' ? (
                  feature.free ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <X className="h-5 w-5 text-muted-foreground" />
                  )
                ) : (
                  feature.free
                )}
              </TableCell>
              <TableCell>
                {typeof feature.creator === 'boolean' ? (
                  feature.creator ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <X className="h-5 w-5 text-muted-foreground" />
                  )
                ) : (
                  feature.creator
                )}
              </TableCell>
              <TableCell>
                {typeof feature.studio === 'boolean' ? (
                  feature.studio ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <X className="h-5 w-5 text-muted-foreground" />
                  )
                ) : (
                  feature.studio
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
