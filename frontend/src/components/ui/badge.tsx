import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'accent' | 'outline';
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    accent: 'bg-accent/10 text-accent',
    outline: 'border border-border text-foreground',
  };
  return (
    <div className={cn('inline-flex items-center rounded-full px-3 py-1 text-xs font-medium', variants[variant], className)} {...props} />
  );
}

export { Badge };
