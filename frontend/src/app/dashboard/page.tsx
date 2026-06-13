'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  User, Clock, Award, Calendar, FileText, CheckCircle, Download,
  Edit, Upload, Trophy, Target,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';
import { formatDate, statusColors } from '@/lib/utils';
import { cn } from '@/lib/utils';

export default function VolunteerDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState('overview');

  useEffect(() => {
    if (!loading && !user) router.push('/login');
    if (!loading && user && (user.role === 'ADMIN' || user.role === 'SUPER_ADMIN')) router.push('/admin');
  }, [user, loading, router]);

  if (loading) return <div className="flex min-h-[60vh] items-center justify-center">Loading...</div>;
  if (!user) return null;

  const profile = {
    fullName: user.name,
    status: 'APPROVED',
    totalHours: 48,
    city: 'New Delhi',
    skills: ['Teaching', 'Event Management'],
    phone: '+91 98765 43210',
  };

  const tasks = [
    { id: '1', title: 'Prepare teaching materials', status: 'IN_PROGRESS', dueDate: '2026-06-20' },
    { id: '2', title: 'Event coordination - Tree Drive', status: 'PENDING', dueDate: '2026-08-01' },
    { id: '3', title: 'Community survey', status: 'COMPLETED', dueDate: '2026-05-15', hours: 4 },
  ];

  const events = [
    { id: '1', title: 'Annual Volunteer Meet 2026', date: '2026-07-15', status: 'registered' },
    { id: '2', title: 'Tree Plantation Drive', date: '2026-08-05', status: 'registered' },
  ];

  const certificates = [
    { id: '1', title: 'Volunteer Excellence Certificate', issuedAt: '2026-01-15' },
    { id: '2', title: '100 Hours Service Certificate', issuedAt: '2026-03-20' },
  ];

  const achievements = [
    { id: '1', title: 'First Event', description: 'Attended your first event' },
    { id: '2', title: '50 Hours Club', description: 'Completed 50 volunteer hours' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold">Volunteer Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {profile.fullName}</p>
          </div>
          <span className={cn('self-start rounded-full px-4 py-1 text-sm font-medium', statusColors[profile.status])}>{profile.status}</span>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Total Hours', value: profile.totalHours, icon: Clock, color: 'text-primary' },
            { label: 'Tasks Completed', value: tasks.filter(t => t.status === 'COMPLETED').length, icon: CheckCircle, color: 'text-success' },
            { label: 'Events Registered', value: events.length, icon: Calendar, color: 'text-secondary' },
            { label: 'Certificates', value: certificates.length, icon: Award, color: 'text-accent' },
          ].map((stat) => (
            <Card key={stat.label} className="border-none shadow-soft">
              <CardContent className="flex items-center gap-4 p-6">
                <stat.icon className={`h-10 w-10 ${stat.color}`} />
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {['overview', 'tasks', 'events', 'certificates', 'profile'].map((t) => (
            <Button key={t} variant={tab === t ? 'default' : 'outline'} size="sm" onClick={() => setTab(t)} className="capitalize">{t}</Button>
          ))}
        </div>

        {tab === 'overview' && (
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-none shadow-soft">
              <CardHeader><CardTitle className="flex items-center gap-2"><Target className="h-5 w-5" /> Active Tasks</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {tasks.filter(t => t.status !== 'COMPLETED').map((task) => (
                  <div key={task.id} className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                    <div>
                      <p className="font-medium">{task.title}</p>
                      <p className="text-xs text-muted-foreground">Due: {formatDate(task.dueDate)}</p>
                    </div>
                    <Badge variant="outline">{task.status}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="border-none shadow-soft">
              <CardHeader><CardTitle className="flex items-center gap-2"><Trophy className="h-5 w-5" /> Achievements</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((a) => (
                  <div key={a.id} className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                    <Award className="h-8 w-8 text-accent" />
                    <div>
                      <p className="font-medium">{a.title}</p>
                      <p className="text-xs text-muted-foreground">{a.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {tab === 'tasks' && (
          <Card className="border-none shadow-soft">
            <CardContent className="p-6 space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-muted-foreground">Due: {formatDate(task.dueDate)} {task.hours && `• ${task.hours} hrs`}</p>
                  </div>
                  <span className={cn('rounded-full px-3 py-1 text-xs font-medium', statusColors[task.status])}>{task.status}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {tab === 'events' && (
          <Card className="border-none shadow-soft">
            <CardContent className="p-6 space-y-4">
              {events.map((event) => (
                <div key={event.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-muted-foreground">{formatDate(event.date)}</p>
                  </div>
                  <Badge variant="secondary">{event.status}</Badge>
                </div>
              ))}
              <Button variant="outline" asChild className="mt-4"><Link href="/events">Browse Events</Link></Button>
            </CardContent>
          </Card>
        )}

        {tab === 'certificates' && (
          <Card className="border-none shadow-soft">
            <CardContent className="p-6 space-y-4">
              {certificates.map((cert) => (
                <div key={cert.id} className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
                  <div className="flex items-center gap-3">
                    <Award className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-medium">{cert.title}</p>
                      <p className="text-sm text-muted-foreground">Issued: {formatDate(cert.issuedAt)}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm"><Download className="h-4 w-4" /> Download</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {tab === 'profile' && (
          <Card className="border-none shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                  {profile.fullName.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold">{profile.fullName}</h3>
                  <p className="text-muted-foreground">{user.email}</p>
                </div>
                <Button variant="outline" size="sm" className="ml-auto"><Edit className="h-4 w-4" /> Edit</Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div><p className="text-sm text-muted-foreground">Phone</p><p className="font-medium">{profile.phone}</p></div>
                <div><p className="text-sm text-muted-foreground">City</p><p className="font-medium">{profile.city}</p></div>
                <div><p className="text-sm text-muted-foreground">Skills</p><p className="font-medium">{profile.skills.join(', ')}</p></div>
                <div><p className="text-sm text-muted-foreground">Total Hours</p><p className="font-medium">{profile.totalHours} hours</p></div>
              </div>
              <div className="mt-6">
                <Button variant="outline"><Upload className="h-4 w-4" /> Upload Document</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
}
