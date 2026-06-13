'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { Section, SectionHeader, FadeIn } from '@/components/layout/section';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { siteConfig } from '@/lib/constants';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-20">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-4xl font-bold md:text-5xl">
            Contact <span className="text-gradient">Us</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            We&apos;d love to hear from you. Reach out for partnerships, volunteering, or general inquiries.
          </motion.p>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <FadeIn>
            <div className="space-y-6">
              <h2 className="font-heading text-2xl font-bold">Get In Touch</h2>
              {[
                { icon: MapPin, label: 'Address', value: siteConfig.contact.address },
                { icon: Phone, label: 'Phone', value: siteConfig.contact.phone },
                { icon: Mail, label: 'Email', value: siteConfig.contact.email },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{item.label}</p>
                    <p className="text-muted-foreground">{item.value}</p>
                  </div>
                </div>
              ))}

              <div className="mt-8 overflow-hidden rounded-xl">
                <iframe
                  src="https://maps.google.com/maps?q=Connaught+Place+New+Delhi&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="NayePankh Foundation Location"
                />
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            {submitted ? (
              <Card className="border-none shadow-soft text-center">
                <CardContent className="p-8">
                  <CheckCircle className="mx-auto mb-4 h-16 w-16 text-success" />
                  <h3 className="font-heading text-2xl font-bold">Message Sent!</h3>
                  <p className="mt-3 text-muted-foreground">Thank you for reaching out. We&apos;ll get back to you within 24-48 hours.</p>
                </CardContent>
              </Card>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="font-heading text-2xl font-bold">Send a Message</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <div><Label>Name *</Label><Input required placeholder="Your name" className="mt-1" /></div>
                  <div><Label>Email *</Label><Input type="email" required placeholder="email@example.com" className="mt-1" /></div>
                </div>
                <div><Label>Subject *</Label><Input required placeholder="How can we help?" className="mt-1" /></div>
                <div><Label>Message *</Label><Textarea required placeholder="Your message..." rows={5} className="mt-1" /></div>
                <Button type="submit" size="lg" className="w-full"><Send className="h-4 w-4" /> Send Message</Button>
              </form>
            )}
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
