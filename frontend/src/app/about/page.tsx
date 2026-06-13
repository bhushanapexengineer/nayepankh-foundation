'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Award, Target, Eye, CheckCircle, FileText } from 'lucide-react';
import { Section, SectionHeader, FadeIn } from '@/components/layout/section';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { siteConfig } from '@/lib/constants';

const objectives = [
  'Provide quality education to underprivileged children in rural areas',
  'Empower women through skill development and entrepreneurship training',
  'Conduct health camps and awareness programs in underserved communities',
  'Promote environmental conservation through tree plantation drives',
  'Develop rural infrastructure including clean water and sanitation',
  'Create employment opportunities through vocational training programs',
];

const achievements = [
  { year: '2025', title: 'Best NGO Award', org: 'Ministry of Social Justice' },
  { year: '2024', title: 'Excellence in Education', org: 'National Education Foundation' },
  { year: '2023', title: 'Green Initiative Award', org: 'Environment Ministry' },
  { year: '2022', title: 'Women Empowerment Recognition', org: 'UN Women India' },
];

const team = [
  { name: 'Dr. Rajesh Mehta', role: 'Founder & Chairman', bio: 'Visionary leader with 20+ years in social work', isBoard: true },
  { name: 'Sunita Devi', role: 'Executive Director', bio: 'Passionate about education and women empowerment', isBoard: true },
  { name: 'Amit Singh', role: 'Program Manager', bio: 'Expert in rural development programs', isBoard: false },
  { name: 'Kavita Rao', role: 'Communications Head', bio: 'Building bridges between communities and donors', isBoard: false },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-20 dark:from-primary/20 dark:to-secondary/20">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-4xl font-bold md:text-5xl">
            About <span className="text-gradient">NayePankh</span> Foundation
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Transforming lives through compassion, action, and sustainable change since 2020.
          </motion.p>
        </div>
      </section>

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <FadeIn>
            <Image src="https://images.unsplash.com/photo-1593113598332-cd288d649053?w=800" alt="Foundation story" width={600} height={400} className="rounded-2xl shadow-soft-lg" />
          </FadeIn>
          <FadeIn delay={0.2}>
            <Badge className="mb-4">Our Story</Badge>
            <h2 className="font-heading text-3xl font-bold">How It All Began</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              NayePankh Foundation was born from a simple belief: that every person deserves the opportunity to live with dignity. Founded in March 2020 by Dr. Rajesh Mehta, what started as a small education initiative in a Delhi slum has grown into a nationwide movement.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Today, we operate across 12 states, working with over 5,000 volunteers to deliver programs in education, healthcare, women empowerment, environment, and rural development. Our name &ldquo;NayePankh&rdquo; — meaning &ldquo;New Wings&rdquo; — reflects our mission to give communities the wings they need to soar.
            </p>
          </FadeIn>
        </div>
      </Section>

      <Section className="bg-muted/50 dark:bg-dark/50">
        <div className="grid gap-8 md:grid-cols-2">
          <FadeIn>
            <Card className="border-none shadow-soft"><CardContent className="p-8">
              <Target className="mb-4 h-10 w-10 text-primary" />
              <h3 className="font-heading text-2xl font-bold">Mission</h3>
              <p className="mt-3 text-muted-foreground">To empower underserved communities through education, healthcare, skill development, and sustainable initiatives.</p>
            </CardContent></Card>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Card className="border-none shadow-soft"><CardContent className="p-8">
              <Eye className="mb-4 h-10 w-10 text-secondary" />
              <h3 className="font-heading text-2xl font-bold">Vision</h3>
              <p className="mt-3 text-muted-foreground">An equitable society where every individual has access to education, healthcare, and opportunities for a dignified life.</p>
            </CardContent></Card>
          </FadeIn>
        </div>
      </Section>

      <Section>
        <SectionHeader title="Our Objectives" />
        <div className="mx-auto max-w-3xl space-y-4">
          {objectives.map((obj, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                <p className="text-muted-foreground">{obj}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section className="bg-muted/50 dark:bg-dark/50">
        <SectionHeader title="Board Members" subtitle="Leading with vision and integrity" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.filter(m => m.isBoard).map((member, i) => (
            <FadeIn key={member.name} delay={i * 0.1}>
              <Card className="border-none shadow-soft text-center">
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="font-heading font-semibold">{member.name}</h3>
                  <p className="text-sm text-primary">{member.role}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader title="Our Team" subtitle="The people behind the impact" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.filter(m => !m.isBoard).map((member, i) => (
            <FadeIn key={member.name} delay={i * 0.1}>
              <Card className="border-none shadow-soft text-center">
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-secondary/10 text-xl font-bold text-secondary">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="font-heading font-semibold">{member.name}</h3>
                  <p className="text-sm text-secondary">{member.role}</p>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section className="bg-muted/50 dark:bg-dark/50">
        <SectionHeader title="Registration Information" />
        <Card className="mx-auto max-w-2xl border-none shadow-soft">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="h-8 w-8 text-primary" />
              <h3 className="font-heading text-xl font-bold">Legal Registration</h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><p className="text-sm text-muted-foreground">Registration Number</p><p className="font-semibold">{siteConfig.registration.number}</p></div>
              <div><p className="text-sm text-muted-foreground">Registration Date</p><p className="font-semibold">{siteConfig.registration.date}</p></div>
              <div><p className="text-sm text-muted-foreground">Organization Type</p><p className="font-semibold">{siteConfig.registration.type}</p></div>
              <div><p className="text-sm text-muted-foreground">Tax Exemption</p><p className="font-semibold">80G & 12A Certified</p></div>
            </div>
          </CardContent>
        </Card>
      </Section>

      <Section>
        <SectionHeader title="Achievements & Awards" />
        <div className="grid gap-6 md:grid-cols-2">
          {achievements.map((a, i) => (
            <FadeIn key={a.title} delay={i * 0.1}>
              <Card className="border-none shadow-soft">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                    <Award className="h-7 w-7 text-accent" />
                  </div>
                  <div>
                    <Badge variant="accent" className="mb-1">{a.year}</Badge>
                    <h3 className="font-heading font-semibold">{a.title}</h3>
                    <p className="text-sm text-muted-foreground">{a.org}</p>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>
    </>
  );
}
