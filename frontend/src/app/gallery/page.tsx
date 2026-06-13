'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play, X } from 'lucide-react';
import { Section, SectionHeader, FadeIn } from '@/components/layout/section';

const galleryItems = [
  { id: '1', title: 'Education Program', url: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600', type: 'IMAGE' },
  { id: '2', title: 'Tree Plantation', url: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600', type: 'IMAGE' },
  { id: '3', title: 'Health Camp', url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600', type: 'IMAGE' },
  { id: '4', title: 'Women Workshop', url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600', type: 'IMAGE' },
  { id: '5', title: 'Volunteer Meet', url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600', type: 'IMAGE' },
  { id: '6', title: 'Community Building', url: 'https://images.unsplash.com/photo-1559027615-cd4628903329?w=600', type: 'IMAGE' },
  { id: '7', title: 'Digital Literacy', url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600', type: 'IMAGE' },
  { id: '8', title: 'Clean Water Project', url: 'https://images.unsplash.com/photo-1548839140-5a7f32a9be4a?w=600', type: 'IMAGE' },
  { id: '9', title: 'Rural Development', url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600', type: 'IMAGE' },
];

export default function GalleryPage() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [tab, setTab] = useState<'all' | 'images' | 'videos'>('all');

  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-20">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-4xl font-bold md:text-5xl">
            Photo <span className="text-gradient">Gallery</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Moments of impact, hope, and transformation.
          </motion.p>
        </div>
      </section>

      <Section>
        <SectionHeader title="Our Gallery" subtitle="Capturing the spirit of service" />
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {galleryItems.map((item, i) => (
            <FadeIn key={item.id} delay={i * 0.05}>
              <div
                className="group relative mb-4 cursor-pointer overflow-hidden rounded-xl break-inside-avoid"
                onClick={() => setLightbox(item.url)}
              >
                <Image src={item.url} alt={item.title} width={600} height={400} className="w-full object-cover transition-transform group-hover:scale-105" />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                  <p className="p-4 text-white font-medium">{item.title}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={() => setLightbox(null)}>
          <button className="absolute right-4 top-4 text-white" onClick={() => setLightbox(null)}><X className="h-8 w-8" /></button>
          <Image src={lightbox} alt="Gallery" width={1200} height={800} className="max-h-[90vh] w-auto rounded-lg object-contain" />
        </div>
      )}
    </>
  );
}
