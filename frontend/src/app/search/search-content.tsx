'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';
import { Section } from '@/components/layout/section';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { categoryLabels, formatDate } from '@/lib/utils';

const allResults = {
  projects: [
    { id: '1', title: 'Rural Education Initiative', slug: 'rural-education-initiative', category: 'EDUCATION' },
    { id: '2', title: 'Green Earth Campaign', slug: 'green-earth-campaign', category: 'ENVIRONMENT' },
  ],
  events: [
    { id: '1', title: 'Annual Volunteer Meet 2026', slug: 'annual-volunteer-meet-2026', date: '2026-07-15' },
  ],
  news: [
    { id: '1', title: 'NayePankh Reaches 5000 Volunteers Milestone', slug: '5000-volunteers-milestone', excerpt: 'Celebrating our growing community.' },
  ],
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const hasResults = query.length >= 2;

  return (
    <Section>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-8 flex items-center gap-3">
          <Search className="h-6 w-6 text-primary" />
          <h1 className="font-heading text-2xl font-bold">
            {hasResults ? `Results for "${query}"` : 'Search'}
          </h1>
        </div>

        {!hasResults ? (
          <p className="text-muted-foreground">Enter a search term to find projects, events, and news.</p>
        ) : (
          <div className="space-y-8">
            {Object.entries(allResults).map(([type, items]) => (
              items.length > 0 && (
                <div key={type}>
                  <h2 className="mb-4 font-heading text-lg font-semibold capitalize">{type}</h2>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <Link key={item.id} href={`/${type === 'news' ? 'about' : type}/${(item as {slug: string}).slug}`}>
                        <Card className="border-none shadow-soft transition-all hover:shadow-soft-lg">
                          <CardContent className="flex items-center justify-between p-4">
                            <div>
                              <p className="font-medium">{item.title}</p>
                              {'excerpt' in item && <p className="text-sm text-muted-foreground">{(item as {excerpt: string}).excerpt}</p>}
                              {'date' in item && <p className="text-sm text-muted-foreground">{formatDate((item as {date: string}).date)}</p>}
                              {'category' in item && <Badge variant="secondary" className="mt-1">{categoryLabels[(item as {category: string}).category]}</Badge>}
                            </div>
                            <ArrowRight className="h-5 w-5 text-muted-foreground" />
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        )}
      </motion.div>
    </Section>
  );
}
