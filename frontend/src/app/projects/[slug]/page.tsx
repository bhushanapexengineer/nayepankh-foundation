'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Target } from 'lucide-react';
import { Section } from '@/components/layout/section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { categoryLabels, statusColors } from '@/lib/utils';
import { cn } from '@/lib/utils';

const projectsData: Record<string, {
  title: string; description: string; category: string; status: string;
  location: string; images: string[]; impactMetrics: Record<string, number>;
}> = {
  'rural-education-initiative': {
    title: 'Rural Education Initiative',
    description: 'Providing quality education to children in remote villages through mobile learning centers and digital classrooms. We deploy trained teachers, supply books and learning materials, and set up solar-powered digital labs.',
    category: 'EDUCATION', status: 'ACTIVE', location: 'Rajasthan, India',
    images: ['https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1200'],
    impactMetrics: { students: 2500, schools: 15, teachers: 45 },
  },
  'green-earth-campaign': {
    title: 'Green Earth Campaign',
    description: 'Planting trees and promoting sustainable practices in urban and rural communities across India.',
    category: 'ENVIRONMENT', status: 'ACTIVE', location: 'Pan India',
    images: ['https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200'],
    impactMetrics: { treesPlanted: 50000, communities: 30 },
  },
  'women-skill-development': {
    title: 'Women Skill Development',
    description: 'Empowering women through vocational training in tailoring, handicrafts, and digital skills.',
    category: 'WOMEN_EMPOWERMENT', status: 'ACTIVE', location: 'Uttar Pradesh, India',
    images: ['https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200'],
    impactMetrics: { womenTrained: 1200, businesses: 85 },
  },
};

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const project = projectsData[slug] || projectsData['rural-education-initiative'];

  return (
    <>
      <section className="relative h-[40vh] min-h-[300px]">
        <Image src={project.images[0]} alt={project.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 container mx-auto px-4 pb-8 lg:px-8">
          <Badge variant="secondary" className="mb-3">{categoryLabels[project.category]}</Badge>
          <h1 className="font-heading text-3xl font-bold text-white md:text-4xl">{project.title}</h1>
          <p className="mt-2 flex items-center gap-1 text-white/80"><MapPin className="h-4 w-4" /> {project.location}</p>
        </div>
      </section>

      <Section>
        <Button variant="ghost" asChild className="mb-6"><Link href="/projects"><ArrowLeft className="h-4 w-4" /> Back to Projects</Link></Button>
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="font-heading text-2xl font-bold">About This Project</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">{project.description}</p>
              <span className={cn('mt-4 inline-block rounded-full px-3 py-1 text-xs font-medium', statusColors[project.status])}>{project.status}</span>
            </motion.div>
          </div>
          <div>
            <Card className="border-none shadow-soft">
              <CardContent className="p-6">
                <h3 className="mb-4 flex items-center gap-2 font-heading font-semibold"><Target className="h-5 w-5 text-primary" /> Impact Metrics</h3>
                {Object.entries(project.impactMetrics).map(([key, val]) => (
                  <div key={key} className="mb-4 border-b pb-4 last:border-0">
                    <p className="text-2xl font-bold text-primary">{val.toLocaleString()}</p>
                    <p className="text-sm capitalize text-muted-foreground">{key.replace(/([A-Z])/g, ' $1')}</p>
                  </div>
                ))}
                <Button className="mt-4 w-full" asChild><Link href="/donate">Support This Project</Link></Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}
