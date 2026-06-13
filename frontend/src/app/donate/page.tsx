'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, QrCode, CheckCircle } from 'lucide-react';
import { Section, SectionHeader, FadeIn } from '@/components/layout/section';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { formatCurrency } from '@/lib/utils';

const campaigns = [
  { id: '1', title: 'Education for Every Child', description: 'Books, uniforms, and digital tools for 1000 children.', goal: 500000, raised: 325000 },
  { id: '2', title: 'Clean Water Initiative', description: 'Water purification systems for 20 villages.', goal: 300000, raised: 180000 },
];

const amounts = [500, 1000, 2500, 5000, 10000];

export default function DonatePage() {
  const [type, setType] = useState<'one-time' | 'monthly'>('one-time');
  const [amount, setAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const finalAmount = customAmount ? Number(customAmount) : amount;

  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-20">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-4xl font-bold md:text-5xl">
            Make a <span className="text-gradient">Donation</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Your generosity fuels our mission. Every contribution creates lasting change.
          </motion.p>
        </div>
      </section>

      <Section>
        <SectionHeader title="Active Campaigns" subtitle="Support a cause close to your heart" />
        <div className="grid gap-8 md:grid-cols-2">
          {campaigns.map((c, i) => (
            <FadeIn key={c.id} delay={i * 0.1}>
              <Card className="border-none shadow-soft">
                <CardContent className="p-6">
                  <h3 className="font-heading text-xl font-semibold">{c.title}</h3>
                  <p className="mt-2 text-muted-foreground">{c.description}</p>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold text-primary">{formatCurrency(c.raised)} raised</span>
                      <span className="text-muted-foreground">Goal: {formatCurrency(c.goal)}</span>
                    </div>
                    <div className="mt-2 h-3 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(c.raised / c.goal) * 100}%` }} />
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{Math.round((c.raised / c.goal) * 100)}% funded</p>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section className="bg-muted/50 dark:bg-dark/50">
        <div className="grid gap-12 lg:grid-cols-2">
          <FadeIn>
            {submitted ? (
              <Card className="border-none shadow-soft text-center">
                <CardContent className="p-8">
                  <CheckCircle className="mx-auto mb-4 h-16 w-16 text-success" />
                  <h3 className="font-heading text-2xl font-bold">Thank You!</h3>
                  <p className="mt-3 text-muted-foreground">Your donation of {formatCurrency(finalAmount)} has been received. A receipt will be sent to your email.</p>
                </CardContent>
              </Card>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="font-heading text-2xl font-bold">Donate Now</h2>
                <div className="flex gap-2">
                  <Button type="button" variant={type === 'one-time' ? 'default' : 'outline'} onClick={() => setType('one-time')} className="flex-1">One-time</Button>
                  <Button type="button" variant={type === 'monthly' ? 'default' : 'outline'} onClick={() => setType('monthly')} className="flex-1">Monthly</Button>
                </div>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                  {amounts.map((a) => (
                    <Button key={a} type="button" variant={amount === a && !customAmount ? 'default' : 'outline'} onClick={() => { setAmount(a); setCustomAmount(''); }}>
                      ₹{a.toLocaleString()}
                    </Button>
                  ))}
                </div>
                <div>
                  <Label>Custom Amount (₹)</Label>
                  <Input type="number" min="1" placeholder="Enter amount" value={customAmount} onChange={(e) => setCustomAmount(e.target.value)} className="mt-1" />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div><Label>Name *</Label><Input required placeholder="Your name" className="mt-1" /></div>
                  <div><Label>Email *</Label><Input type="email" required placeholder="email@example.com" className="mt-1" /></div>
                  <div><Label>Phone</Label><Input placeholder="+91 98765 43210" className="mt-1" /></div>
                </div>
                <div><Label>Message</Label><Textarea placeholder="Optional message" className="mt-1" /></div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="anonymous" className="rounded" />
                  <Label htmlFor="anonymous" className="text-sm">Donate anonymously</Label>
                </div>
                <Button type="submit" size="lg" className="w-full">
                  <Heart className="h-5 w-5" /> Donate {formatCurrency(finalAmount)}{type === 'monthly' ? '/month' : ''}
                </Button>
              </form>
            )}
          </FadeIn>

          <FadeIn delay={0.2}>
            <Card className="border-none shadow-soft">
              <CardContent className="p-8 text-center">
                <QrCode className="mx-auto mb-4 h-16 w-16 text-primary" />
                <h3 className="font-heading text-xl font-bold">Scan to Donate</h3>
                <p className="mt-2 text-muted-foreground">Use UPI to donate instantly</p>
                <div className="mx-auto mt-6 flex h-48 w-48 items-center justify-center rounded-xl bg-muted">
                  <div className="text-center">
                    <QrCode className="mx-auto h-24 w-24 text-foreground/20" />
                    <p className="mt-2 text-xs text-muted-foreground">UPI: donate@nayepankh</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">80G Tax Exemption Available</p>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
