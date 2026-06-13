import Link from 'next/link';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { siteConfig, navLinks } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="bg-dark text-dark-foreground">
      <div className="container mx-auto px-4 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Heart className="h-5 w-5 text-white" fill="white" />
              </div>
              <span className="font-heading text-lg font-bold">NayePankh</span>
            </div>
            <p className="mb-6 text-sm text-dark-foreground/70">{siteConfig.description}</p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: siteConfig.social.facebook },
                { icon: Twitter, href: siteConfig.social.twitter },
                { icon: Instagram, href: siteConfig.social.instagram },
                { icon: Linkedin, href: siteConfig.social.linkedin },
                { icon: Youtube, href: siteConfig.social.youtube },
              ].map(({ icon: Icon, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-dark-foreground/10 transition-colors hover:bg-primary">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-heading font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-dark-foreground/70 transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-heading font-semibold">Get Involved</h4>
            <ul className="space-y-2">
              <li><Link href="/volunteer" className="text-sm text-dark-foreground/70 hover:text-primary">Become a Volunteer</Link></li>
              <li><Link href="/donate" className="text-sm text-dark-foreground/70 hover:text-primary">Make a Donation</Link></li>
              <li><Link href="/events" className="text-sm text-dark-foreground/70 hover:text-primary">Upcoming Events</Link></li>
              <li><Link href="/projects" className="text-sm text-dark-foreground/70 hover:text-primary">Our Projects</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-heading font-semibold">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-dark-foreground/70">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {siteConfig.contact.address}
              </li>
              <li className="flex items-center gap-2 text-sm text-dark-foreground/70">
                <Phone className="h-4 w-4 text-primary" />
                {siteConfig.contact.phone}
              </li>
              <li className="flex items-center gap-2 text-sm text-dark-foreground/70">
                <Mail className="h-4 w-4 text-primary" />
                {siteConfig.contact.email}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-dark-foreground/10 pt-8 md:flex-row">
          <p className="text-sm text-dark-foreground/50">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-sm text-dark-foreground/50">
            Reg. No: {siteConfig.registration.number}
          </p>
        </div>
      </div>
    </footer>
  );
}
