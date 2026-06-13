'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowRight, Users, Target, Eye, Heart, BookOpen, TreePine,
  Award, Calendar, Quote, HandHeart, Sparkles, Globe, Shield, Lightbulb, Leaf,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Section, SectionHeader, FadeIn } from '@/components/layout/section';
import { coreValues, siteConfig } from '@/lib/constants';
import { formatCurrency, formatDate, categoryLabels } from '@/lib/utils';

const iconMap: Record<string, React.ElementType> = {
  Heart, Shield, Lightbulb, Users, Leaf, Globe,
};

const fallbackStats = { volunteers: 5000, projectsCompleted: 45, eventsConducted: 120, fundsRaised: 2500000, livesImpacted: 50000 };
const fallbackProjects = [
  { id: '1', title: 'Rural Education Initiative', shortDesc: 'Bringing education to rural children', category: 'EDUCATION', status: 'ACTIVE', images: ['https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800'], slug: 'rural-education' },
  { id: '2', title: 'Green Earth Campaign', shortDesc: 'Environmental conservation drive', category: 'ENVIRONMENT', status: 'ACTIVE', images: ['https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800'], slug: 'green-earth' },
  { id: '3', title: 'Women Skill Development', shortDesc: 'Empowering women through skills', category: 'WOMEN_EMPOWERMENT', status: 'ACTIVE', images: ['https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800'], slug: 'women-skills' },
];
const fallbackEvents = [
  { id: '1', title: 'Annual Volunteer Meet 2026', date: '2026-07-15', location: 'New Delhi', slug: 'volunteer-meet', status: 'UPCOMING' },
  { id: '2', title: 'Tree Plantation Drive', date: '2026-08-05', location: 'Lodhi Gardens, Delhi', slug: 'tree-plantation', status: 'UPCOMING' },
];
const fallbackTestimonials = [
  { id: '1', name: 'Priya Sharma', role: 'Volunteer', content: 'NayePankh changed my perspective on giving back. The team is incredibly supportive and the impact is real.', rating: 5 },
  { id: '2', name: 'Rajesh Kumar', role: 'Beneficiary', content: 'Thanks to their education program, my daughter is now the first in our family to attend college.', rating: 5 },
  { id: '3', name: 'Dr. Ananya Patel', role: 'Partner Doctor', content: 'Partnering with NayePankh for health camps has been rewarding. They reach communities that need help the most.', rating: 5 },
];

export default function HomePage() {
  const stats = fallbackStats;
  const projects = fallbackProjects;
  const events = fallbackEvents;
  const testimonials = fallbackTestimonials;

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5 dark:from-primary/10 dark:via-dark dark:to-secondary/10">
        {/* subtle background image via Next/Image for reliability */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <Image
            src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1920"
            alt=""
            fill
            className="object-cover object-center opacity-5"
            priority
            sizes="100vw"
          />
        </div>
        <div className="container relative mx-auto px-4 py-20 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <Badge variant="secondary" className="mb-4">Making a Difference Since 2020</Badge>
              <h1 className="font-heading text-4xl font-bold leading-tight text-foreground dark:text-dark-foreground md:text-5xl lg:text-6xl">
                Empowering <span className="text-gradient">Communities</span>, Transforming Lives
              </h1>
              <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                {siteConfig.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link href="/volunteer">Join as Volunteer <ArrowRight className="h-5 w-5" /></Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/donate">Donate Now</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="relative hidden lg:block">
              {/* Fixed: use a defined width/height instead of fill so the image always renders */}
              <div className="relative mx-auto max-w-lg">
                <div className="relative w-full" style={{ paddingBottom: '100%' }}>
                  <Image
                    src="https://images.unsplash.com/photo-1559027615-cd4628903329?w=800"
                    alt="Volunteers helping community"
                    fill
                    className="rounded-2xl object-cover shadow-soft-lg"
                    priority
                    sizes="(max-width: 1024px) 0px, 512px"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 rounded-xl bg-white p-4 shadow-soft-lg dark:bg-dark">
                  <p className="text-2xl font-bold text-primary">{stats.volunteers.toLocaleString()}+</p>
                  <p className="text-sm text-muted-foreground">Active Volunteers</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <Section className="bg-primary text-white">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
          {[
            { label: 'Volunteers', value: stats.volunteers, icon: Users },
            { label: 'Projects Completed', value: stats.projectsCompleted, icon: Target },
            { label: 'Events Conducted', value: stats.eventsConducted, icon: Calendar },
            { label: 'Funds Raised', value: formatCurrency(stats.fundsRaised), icon: HandHeart },
            { label: 'Lives Impacted', value: stats.livesImpacted, icon: Heart },
          ].map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.1}>
              <div className="text-center">
                <stat.icon className="mx-auto mb-3 h-8 w-8 opacity-80" />
                <p className="text-2xl font-bold md:text-3xl">{typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}</p>
                <p className="mt-1 text-sm opacity-80">{stat.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Introduction */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <FadeIn>
            <Image src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800" alt="Community work" width={600} height={400} className="rounded-2xl shadow-soft-lg" />
          </FadeIn>
          <FadeIn delay={0.2}>
            <Badge variant="default" className="mb-4">About NayePankh</Badge>
            <h2 className="font-heading text-3xl font-bold dark:text-dark-foreground">Building a Better Tomorrow, Together</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Founded in 2020, NayePankh Foundation has been at the forefront of social change in India. We work across education, healthcare, women empowerment, environment, and rural development to create sustainable impact in underserved communities.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Our approach combines grassroots action with strategic partnerships, ensuring every initiative creates lasting change. With over 5,000 volunteers and 45 completed projects, we continue to expand our reach across the nation.
            </p>
            <Button className="mt-6" asChild><Link href="/about">Learn More <ArrowRight className="h-4 w-4" /></Link></Button>
          </FadeIn>
        </div>
      </Section>

      {/* Mission & Vision */}
      <Section className="bg-muted/50 dark:bg-dark/50">
        <div className="grid gap-8 md:grid-cols-2">
          <FadeIn>
            <Card className="h-full border-none shadow-soft">
              <CardContent className="p-8">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                  <Target className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-heading text-2xl font-bold">Our Mission</h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  To empower underserved communities through education, healthcare, skill development, and sustainable initiatives, creating self-reliant societies where every individual has the opportunity to thrive.
                </p>
              </CardContent>
            </Card>
          </FadeIn>
          <FadeIn delay={0.15}>
            <Card className="h-full border-none shadow-soft">
              <CardContent className="p-8">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/10">
                  <Eye className="h-7 w-7 text-secondary" />
                </div>
                <h3 className="font-heading text-2xl font-bold">Our Vision</h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  A world where every person, regardless of their background, has access to quality education, healthcare, and opportunities to build a dignified life — creating an equitable and compassionate society.
                </p>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </Section>

      {/* Core Values */}
      <Section>
        <SectionHeader title="Our Core Values" subtitle="The principles that guide everything we do" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coreValues.map((value, i) => {
            const Icon = iconMap[value.icon] || Heart;
            return (
              <FadeIn key={value.title} delay={i * 0.1}>
                <Card className="h-full border-none shadow-soft transition-all hover:shadow-soft-lg hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold">{value.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      {/* Founder Message */}
      <Section className="bg-gradient-primary text-white">
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <Quote className="mx-auto mb-6 h-10 w-10 opacity-50" />
            <p className="text-xl leading-relaxed md:text-2xl">
              &ldquo;Every child educated, every woman empowered, every tree planted — these are not just numbers, they are stories of transformation. At NayePankh, we believe that collective action can move mountains.&rdquo;
            </p>
            <div className="mt-8">
              <p className="font-heading text-lg font-semibold">Dr. Rajesh Mehta</p>
              <p className="text-sm opacity-80">Founder & Chairman, NayePankh Foundation</p>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Featured Projects */}
      <Section>
        <SectionHeader title="Featured Projects" subtitle="Creating lasting impact across India" />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <FadeIn key={project.id} delay={i * 0.1}>
              <Link href={`/projects/${project.slug}`}>
                <Card className="group overflow-hidden border-none shadow-soft transition-all hover:shadow-soft-lg hover:-translate-y-1">
                  <div className="relative aspect-video overflow-hidden">
                    <Image src={project.images[0]} alt={project.title} fill className="object-cover transition-transform group-hover:scale-105" />
                    <Badge className="absolute left-4 top-4" variant="secondary">{categoryLabels[project.category]}</Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-heading text-lg font-semibold group-hover:text-primary">{project.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{project.shortDesc}</p>
                  </CardContent>
                </Card>
              </Link>
            </FadeIn>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button variant="outline" asChild><Link href="/projects">View All Projects <ArrowRight className="h-4 w-4" /></Link></Button>
        </div>
      </Section>

      {/* Testimonials */}
      <Section className="bg-muted/50 dark:bg-dark/50">
        <SectionHeader title="What People Say" subtitle="Stories from our community" />
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <FadeIn key={t.id} delay={i * 0.1}>
              <Card className="h-full border-none shadow-soft">
                <CardContent className="p-6">
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Sparkles key={j} className="h-4 w-4 text-accent" fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">&ldquo;{t.content}&rdquo;</p>
                  <div className="mt-4 border-t pt-4">
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Upcoming Events */}
      <Section>
        <SectionHeader title="Upcoming Events" subtitle="Join us and make a difference" />
        <div className="grid gap-6 md:grid-cols-2">
          {events.map((event, i) => (
            <FadeIn key={event.id} delay={i * 0.1}>
              <Link href={`/events/${event.slug}`}>
                <Card className="group border-none shadow-soft transition-all hover:shadow-soft-lg">
                  <CardContent className="flex items-center gap-6 p-6">
                    <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-xl bg-primary/10">
                      <span className="text-2xl font-bold text-primary">{new Date(event.date).getDate()}</span>
                      <span className="text-xs text-primary">{new Date(event.date).toLocaleString('en', { month: 'short' })}</span>
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold group-hover:text-primary">{event.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{event.location}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{formatDate(event.date)}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </FadeIn>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button variant="outline" asChild><Link href="/events">View All Events</Link></Button>
        </div>
      </Section>

      {/* CTA Sections */}
      <Section className="bg-dark text-dark-foreground">
        <div className="grid gap-8 md:grid-cols-2">
          <FadeIn>
            <Card className="border-none bg-primary/20">
              <CardContent className="p-8 text-center">
                <HandHeart className="mx-auto mb-4 h-12 w-12 text-primary" />
                <h3 className="font-heading text-2xl font-bold">Make a Donation</h3>
                <p className="mt-3 text-dark-foreground/70">Your contribution can change lives. Every rupee counts towards building a better future.</p>
                <Button className="mt-6" size="lg" asChild><Link href="/donate">Donate Now</Link></Button>
              </CardContent>
            </Card>
          </FadeIn>
          <FadeIn delay={0.15}>
            <Card className="border-none bg-secondary/20">
              <CardContent className="p-8 text-center">
                <Users className="mx-auto mb-4 h-12 w-12 text-secondary" />
                <h3 className="font-heading text-2xl font-bold">Become a Volunteer</h3>
                <p className="mt-3 text-dark-foreground/70">Join our community of changemakers. Share your skills and time to create real impact.</p>
                <Button className="mt-6" variant="secondary" size="lg" asChild><Link href="/volunteer">Join Now</Link></Button>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </Section>

      {/* Contact Section */}
      <Section>
        <SectionHeader title="Get In Touch" subtitle="We'd love to hear from you" />
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
          {[
            { icon: BookOpen, label: 'Email', value: siteConfig.contact.email },
            { icon: TreePine, label: 'Phone', value: siteConfig.contact.phone },
            { icon: Award, label: 'Address', value: 'New Delhi, India' },
          ].map((item, i) => (
            <FadeIn key={item.label} delay={i * 0.1}>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <p className="font-semibold">{item.label}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.value}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild><Link href="/contact">Contact Us</Link></Button>
        </div>
      </Section>
    </>
  );
}
