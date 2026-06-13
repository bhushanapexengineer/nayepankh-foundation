'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { api } from '@/lib/api';

export default function RegisterPage() {
  const [step, setStep] = useState<'register' | 'otp'>('register');
  const [form, setForm] = useState({ name: '', email: '', password: '', otp: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.register(form);
      setStep('otp');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.verifyOTP({ email: form.email, otp: form.otp });
      localStorage.setItem('token', res.data.accessToken);
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
            <Heart className="h-6 w-6 text-white" fill="white" />
          </div>
          <h1 className="font-heading text-2xl font-bold">{step === 'register' ? 'Create Account' : 'Verify Email'}</h1>
        </div>
        <Card className="border-none shadow-soft">
          <CardContent className="p-6">
            {step === 'register' ? (
              <form onSubmit={handleRegister} className="space-y-4">
                {error && <div className="rounded-md bg-error/10 p-3 text-sm text-error">{error}</div>}
                <div><Label>Name</Label><Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1" /></div>
                <div><Label>Email</Label><Input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1" /></div>
                <div><Label>Password</Label><Input type="password" required minLength={8} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="mt-1" /></div>
                <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Creating...' : 'Register'}</Button>
              </form>
            ) : (
              <form onSubmit={handleVerify} className="space-y-4">
                {error && <div className="rounded-md bg-error/10 p-3 text-sm text-error">{error}</div>}
                <p className="text-sm text-muted-foreground">Enter the 6-digit code sent to {form.email}</p>
                <div><Label>OTP Code</Label><Input required maxLength={6} value={form.otp} onChange={(e) => setForm({ ...form, otp: e.target.value })} className="mt-1 text-center text-2xl tracking-widest" /></div>
                <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Verifying...' : 'Verify & Continue'}</Button>
              </form>
            )}
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Already have an account? <Link href="/login" className="text-primary hover:underline">Sign In</Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
