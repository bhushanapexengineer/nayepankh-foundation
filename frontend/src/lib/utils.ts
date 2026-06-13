import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

export const categoryLabels: Record<string, string> = {
  EDUCATION: 'Education',
  ENVIRONMENT: 'Environment',
  WOMEN_EMPOWERMENT: 'Women Empowerment',
  RURAL_DEVELOPMENT: 'Rural Development',
  HEALTH: 'Health',
  SKILL_DEVELOPMENT: 'Skill Development',
};

export const statusColors: Record<string, string> = {
  ACTIVE: 'bg-success/10 text-success',
  COMPLETED: 'bg-primary/10 text-primary',
  PLANNING: 'bg-accent/10 text-accent',
  UPCOMING: 'bg-secondary/10 text-secondary',
  PENDING: 'bg-accent/10 text-accent',
  APPROVED: 'bg-success/10 text-success',
  REJECTED: 'bg-error/10 text-error',
};
