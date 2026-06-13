'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Section, FadeIn } from '@/components/layout/section';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDate, statusColors } from '@/lib/utils';
import { cn } from '@/lib/utils';

const events = [
  { id: '1', title: 'Annual Volunteer Meet 2026', slug: 'annual-volunteer-meet-2026', description: 'Join us for workshops, networking, and celebration.', date: '2026-07-15', location: 'New Delhi Convention Center', status: 'UPCOMING', maxAttendees: 500, _count: { registrations: 234 } },
  { id: '2', title: 'Tree Plantation Drive', slug: 'tree-plantation-drive-2026', description: 'Plant 1000 trees in one day!', date: '2026-08-05', location: 'Lodhi Gardens, Delhi', status: 'UPCOMING', maxAttendees: 200, _count: { registrations: 89 } },
  { id: '3', title: 'Health Camp - Village Outreach', slug: 'health-camp-village-outreach', description: 'Free health checkups for rural communities.', date: '2026-04-20', location: 'Village Rampur, Rajasthan', status: 'COMPLETED', _count: { registrations: 156 } },
  { id: '4', title: 'Digital Literacy Workshop', slug: 'digital-literacy-workshop', description: 'Teaching computer basics to rural youth.', date: '2026-05-10', location: 'Community Center, Bhopal', status: 'COMPLETED', _count: { registrations: 45 } },
];

export default function EventsPage() {
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');
  const filtered = events.filter(e => tab === 'upcoming' ? e.status === 'UPCOMING' : e.status === 'COMPLETED');

  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-20">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-4xl font-bold md:text-5xl">
            Events & <span className="text-gradient">Activities</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Join our events and be part of the change.
          </motion.p>
        </div>
      </section>

      <Section>
        <div className="mb-8 flex justify-center gap-2">
          <Button variant={tab === 'upcoming' ? 'default' : 'outline'} onClick={() => setTab('upcoming')}>Upcoming Events</Button>
          <Button variant={tab === 'past' ? 'default' : 'outline'} onClick={() => setTab('past')}>Past Events</Button>
        </div>

        <div className="space-y-6">
          {filtered.map((event, i) => (
            <FadeIn key={event.id} delay={i * 0.05}>
              <Link href={`/events/${event.slug}`}>
                <Card className="group border-none shadow-soft transition-all hover:shadow-soft-lg">
                  <CardContent className="flex flex-col gap-6 p-6 md:flex-row md:items-center">
                    <div className="flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-xl bg-primary/10">
                      <span className="text-3xl font-bold text-primary">{new Date(event.date).getDate()}</span>
                      <span className="text-sm text-primary">{new Date(event.date).toLocaleString('en', { month: 'short', year: 'numeric' })}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={cn('rounded-full px-3 py-1 text-xs font-medium', statusColors[event.status])}>{event.status}</span>
                      </div>
                      <h3 className="font-heading text-xl font-semibold group-hover:text-primary">{event.title}</h3>
                      <p className="mt-1 text-muted-foreground">{event.description}</p>
                      <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {event.location}</span>
                        <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {formatDate(event.date)}</span>
                        {event._count && <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {event._count.registrations} registered</span>}
                      </div>
                    </div>
                    {tab === 'upcoming' && (
                      <Button className="shrink-0">Register Now</Button>
                    )}
                  </CardContent>
                </Card>
              </Link>
            </FadeIn>
          ))}
        </div>
      </Section>
    </>
  );
}
