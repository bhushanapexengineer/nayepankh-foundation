'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, Search, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { navLinks, siteConfig } from '@/lib/constants';
import { useAuth } from '@/lib/auth-context';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const dashboardLink = user?.role === 'SUPER_ADMIN' || user?.role === 'ADMIN'
    ? '/admin'
    : user?.role === 'VOLUNTEER'
    ? '/dashboard'
    : null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg dark:bg-dark/80 dark:border-dark-foreground/10">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Heart className="h-5 w-5 text-white" fill="white" />
          </div>
          <span className="font-heading text-lg font-bold text-foreground dark:text-dark-foreground">
            Naye<span className="text-primary">Pankh</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-primary',
                pathname === link.href ? 'text-primary' : 'text-foreground/70 dark:text-dark-foreground/70'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setSearchOpen(!searchOpen)}>
            <Search className="h-5 w-5" />
          </Button>
          <ThemeToggle />

          {user ? (
            <div className="hidden items-center gap-2 lg:flex">
              {dashboardLink && (
                <Button variant="outline" size="sm" asChild>
                  <Link href={dashboardLink}><User className="h-4 w-4" /> Dashboard</Link>
                </Button>
              )}
              <Button variant="ghost" size="icon" onClick={logout}><LogOut className="h-4 w-4" /></Button>
            </div>
          ) : (
            <div className="hidden items-center gap-2 lg:flex">
              <Button variant="ghost" size="sm" asChild><Link href="/login">Login</Link></Button>
              <Button size="sm" asChild><Link href="/donate">Donate</Link></Button>
            </div>
          )}

          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-border lg:hidden dark:border-dark-foreground/10"
          >
            <div className="container mx-auto space-y-1 px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'block rounded-md px-3 py-2 text-sm font-medium',
                    pathname === link.href ? 'bg-primary/10 text-primary' : 'text-foreground dark:text-dark-foreground'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-2 pt-2">
                {!user && (
                  <>
                    <Button variant="outline" size="sm" className="flex-1" asChild>
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button size="sm" className="flex-1" asChild>
                      <Link href="/donate">Donate</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="border-t border-border bg-background p-4 dark:bg-dark dark:border-dark-foreground/10"
          >
            <form action="/search" className="container mx-auto flex gap-2">
              <input
                name="q"
                placeholder={`Search ${siteConfig.name}...`}
                className="flex-1 rounded-md border border-border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark dark:border-dark-foreground/20 dark:text-dark-foreground"
                autoFocus
              />
              <Button type="submit">Search</Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
