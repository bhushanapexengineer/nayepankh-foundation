'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';
import { Section, SectionHeader, FadeIn } from '@/components/layout/section';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { volunteerBenefits, volunteerFAQ } from '@/lib/constants';

export default function VolunteerPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <section className="bg-gradient-to-br from-secondary/10 to-primary/10 py-20">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-4xl font-bold md:text-5xl">
            Become a <span className="text-gradient">Volunteer</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Join 5,000+ changemakers making a difference across India.
          </motion.p>
        </div>
      </section>

      <Section>
        <SectionHeader title="Why Volunteer With Us?" subtitle="Benefits of joining the NayePankh family" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {volunteerBenefits.map((b, i) => (
            <FadeIn key={b.title} delay={i * 0.1}>
              <Card className="h-full border-none shadow-soft">
                <CardContent className="p-6">
                  <CheckCircle className="mb-3 h-8 w-8 text-success" />
                  <h3 className="font-heading font-semibold">{b.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{b.description}</p>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section className="bg-muted/50 dark:bg-dark/50">
        <SectionHeader title="Volunteer Registration" subtitle="Fill out the form to join our community" />
        {submitted ? (
          <Card className="mx-auto max-w-lg border-none shadow-soft text-center">
            <CardContent className="p-8">
              <CheckCircle className="mx-auto mb-4 h-16 w-16 text-success" />
              <h3 className="font-heading text-2xl font-bold">Application Submitted!</h3>
              <p className="mt-3 text-muted-foreground">Thank you for your interest. We&apos;ll review your application and get back to you soon.</p>
              <Button className="mt-6" asChild><Link href="/login">Login to Track Status</Link></Button>
            </CardContent>
          </Card>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div><Label htmlFor="fullName">Full Name *</Label><Input id="fullName" required placeholder="Your full name" className="mt-1" /></div>
              <div><Label htmlFor="gender">Gender *</Label><Input id="gender" required placeholder="Male/Female/Other" className="mt-1" /></div>
              <div><Label htmlFor="dob">Date of Birth *</Label><Input id="dob" type="date" required className="mt-1" /></div>
              <div><Label htmlFor="email">Email *</Label><Input id="email" type="email" required placeholder="email@example.com" className="mt-1" /></div>
              <div><Label htmlFor="phone">Phone *</Label><Input id="phone" required placeholder="+91 98765 43210" className="mt-1" /></div>
              <div><Label htmlFor="city">City *</Label><Input id="city" required placeholder="Your city" className="mt-1" /></div>
              <div><Label htmlFor="state">State *</Label><Input id="state" required placeholder="Your state" className="mt-1" /></div>
              <div><Label htmlFor="education">Education *</Label><Input id="education" required placeholder="Highest qualification" className="mt-1" /></div>
              <div><Label htmlFor="occupation">Occupation</Label><Input id="occupation" placeholder="Your occupation" className="mt-1" /></div>
              <div><Label htmlFor="availability">Availability *</Label><Input id="availability" required placeholder="e.g., Weekends, 4 hrs/week" className="mt-1" /></div>
            </div>
            <div><Label htmlFor="address">Address *</Label><Textarea id="address" required placeholder="Full address" className="mt-1" /></div>
            <div><Label htmlFor="skills">Skills *</Label><Input id="skills" required placeholder="Teaching, Coding, Design (comma separated)" className="mt-1" /></div>
            <div><Label htmlFor="interests">Interests *</Label><Input id="interests" required placeholder="Education, Environment (comma separated)" className="mt-1" /></div>
            <div><Label htmlFor="experience">Experience</Label><Textarea id="experience" placeholder="Previous volunteer experience" className="mt-1" /></div>
            <div className="grid gap-6 md:grid-cols-2">
              <div><Label htmlFor="emergencyContact">Emergency Contact *</Label><Input id="emergencyContact" required placeholder="Contact name" className="mt-1" /></div>
              <div><Label htmlFor="emergencyPhone">Emergency Phone *</Label><Input id="emergencyPhone" required placeholder="Phone number" className="mt-1" /></div>
            </div>
            <div><Label htmlFor="photo">Profile Photo</Label><Input id="photo" type="file" accept="image/*" className="mt-1" /></div>
            <Button type="submit" size="lg" className="w-full">Submit Application</Button>
          </form>
        )}
      </Section>

      <Section>
        <SectionHeader title="Frequently Asked Questions" />
        <div className="mx-auto max-w-3xl space-y-3">
          {volunteerFAQ.map((faq, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <Card className="border-none shadow-soft cursor-pointer" onClick={() => setOpenFAQ(openFAQ === i ? null : i)}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{faq.q}</h3>
                    {openFAQ === i ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </div>
                  {openFAQ === i && <p className="mt-3 text-muted-foreground">{faq.a}</p>}
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>
    </>
  );
}
