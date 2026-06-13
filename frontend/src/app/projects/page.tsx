'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Section, SectionHeader, FadeIn } from '@/components/layout/section';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { categoryLabels, statusColors } from '@/lib/utils';
import { cn } from '@/lib/utils';

const categories = ['ALL', 'EDUCATION', 'ENVIRONMENT', 'WOMEN_EMPOWERMENT', 'RURAL_DEVELOPMENT', 'HEALTH', 'SKILL_DEVELOPMENT'];

const projects = [
  { id: '1', title: 'Rural Education Initiative', slug: 'rural-education-initiative', description: 'Providing quality education to children in remote villages.', shortDesc: 'Bringing education to rural children', category: 'EDUCATION', status: 'ACTIVE', images: ['https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800'], impactMetrics: { students: 2500, schools: 15 }, location: 'Rajasthan' },
  { id: '2', title: 'Green Earth Campaign', slug: 'green-earth-campaign', description: 'Planting trees and promoting sustainable practices.', shortDesc: 'Environmental conservation drive', category: 'ENVIRONMENT', status: 'ACTIVE', images: ['https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800'], impactMetrics: { treesPlanted: 50000 }, location: 'Pan India' },
  { id: '3', title: 'Women Skill Development', slug: 'women-skill-development', description: 'Empowering women through vocational training.', shortDesc: 'Empowering women through skills', category: 'WOMEN_EMPOWERMENT', status: 'ACTIVE', images: ['https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800'], impactMetrics: { womenTrained: 1200 }, location: 'Uttar Pradesh' },
  { id: '4', title: 'Village Health Camps', slug: 'village-health-camps', description: 'Free health checkups in underserved rural areas.', shortDesc: 'Healthcare for rural communities', category: 'HEALTH', status: 'COMPLETED', images: ['https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800'], impactMetrics: { patients: 8000 }, location: 'Bihar' },
  { id: '5', title: 'Digital Literacy Program', slug: 'digital-literacy-program', description: 'Teaching computer skills to rural youth.', shortDesc: 'Digital skills for youth', category: 'SKILL_DEVELOPMENT', status: 'ACTIVE', images: ['https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800'], impactMetrics: { youthTrained: 3000 }, location: 'Madhya Pradesh' },
  { id: '6', title: 'Clean Water Project', slug: 'clean-water-project', description: 'Installing water purification systems in villages.', shortDesc: 'Clean water for villages', category: 'RURAL_DEVELOPMENT', status: 'ACTIVE', images: ['https://images.unsplash.com/photo-1548839140-5a7f32a9be4a?w=800'], impactMetrics: { villages: 20 }, location: 'Odisha' },
];

export default function ProjectsPage() {
  const [filter, setFilter] = useState('ALL');
  const filtered = filter === 'ALL' ? projects : projects.filter(p => p.category === filter);

  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-20">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-4xl font-bold md:text-5xl">
            Our <span className="text-gradient">Projects</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Discover the initiatives creating real change across India.
          </motion.p>
        </div>
      </section>

      <Section>
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <Button key={cat} variant={filter === cat ? 'default' : 'outline'} size="sm" onClick={() => setFilter(cat)}>
              {cat === 'ALL' ? 'All' : categoryLabels[cat]}
            </Button>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <FadeIn key={project.id} delay={i * 0.05}>
              <Link href={`/projects/${project.slug}`}>
                <Card className="group h-full overflow-hidden border-none shadow-soft transition-all hover:shadow-soft-lg hover:-translate-y-1">
                  <div className="relative aspect-video overflow-hidden">
                    <Image src={project.images[0]} alt={project.title} fill className="object-cover transition-transform group-hover:scale-105" />
                    <div className="absolute left-4 top-4 flex gap-2">
                      <Badge variant="secondary">{categoryLabels[project.category]}</Badge>
                      <span className={cn('rounded-full px-3 py-1 text-xs font-medium', statusColors[project.status])}>{project.status}</span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-heading text-lg font-semibold group-hover:text-primary">{project.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{project.shortDesc}</p>
                    {project.impactMetrics && (
                      <div className="mt-4 flex flex-wrap gap-3">
                        {Object.entries(project.impactMetrics).slice(0, 2).map(([key, val]) => (
                          <div key={key} className="text-center">
                            <p className="text-lg font-bold text-primary">{val.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                          </div>
                        ))}
                      </div>
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
