'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, Users } from 'lucide-react';
import { Section } from '@/components/layout/section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatDate, statusColors } from '@/lib/utils';
import { cn } from '@/lib/utils';

const eventsData: Record<string, {
  title: string; description: string; date: string; location: string;
  status: string; maxAttendees: number; registrations: number;
}> = {
  'annual-volunteer-meet-2026': {
    title: 'Annual Volunteer Meet 2026',
    description: 'Join us for our annual volunteer gathering with workshops, networking sessions, and celebration of our collective impact. Meet fellow changemakers and learn new skills.',
    date: '2026-07-15', location: 'New Delhi Convention Center', status: 'UPCOMING', maxAttendees: 500, registrations: 234,
  },
  'tree-plantation-drive-2026': {
    title: 'Tree Plantation Drive',
    description: 'Plant 1000 trees in one day! Join our mega plantation drive at Lodhi Gardens.',
    date: '2026-08-05', location: 'Lodhi Gardens, Delhi', status: 'UPCOMING', maxAttendees: 200, registrations: 89,
  },
};

export default function EventDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const event = eventsData[slug] || eventsData['annual-volunteer-meet-2026'];

  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <Button variant="ghost" asChild className="mb-4"><Link href="/events"><ArrowLeft className="h-4 w-4" /> Back to Events</Link></Button>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className={cn('rounded-full px-3 py-1 text-xs font-medium', statusColors[event.status])}>{event.status}</span>
            <h1 className="mt-3 font-heading text-3xl font-bold md:text-4xl">{event.title}</h1>
            <div className="mt-4 flex flex-wrap gap-4 text-muted-foreground">
              <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {formatDate(event.date)}</span>
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {event.location}</span>
              <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {event.registrations}/{event.maxAttendees} registered</span>
            </div>
          </motion.div>
        </div>
      </section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-heading text-2xl font-bold">Event Details</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">{event.description}</p>
          </div>
          <Card className="h-fit border-none shadow-soft">
            <CardContent className="p-6">
              <h3 className="font-heading font-semibold">Register for this Event</h3>
              <p className="mt-2 text-sm text-muted-foreground">Volunteers must be logged in and approved to register.</p>
              <div className="mt-4 space-y-2">
                <Button className="w-full" asChild><Link href="/login">Login to Register</Link></Button>
                <Button variant="outline" className="w-full" asChild><Link href="/volunteer">Become a Volunteer</Link></Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  );
}
