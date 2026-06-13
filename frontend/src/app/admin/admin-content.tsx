'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Users, Calendar, DollarSign, FolderKanban, TrendingUp,
  CheckCircle, XCircle, Download, BarChart3, Settings,
} from 'lucide-react';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement,
  LineElement, PointElement, Title, Tooltip, Legend, Filler,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';
import { formatCurrency, formatDate, statusColors } from '@/lib/utils';
import { cn } from '@/lib/utils';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, Filler);

export default function AdminDashboardContent() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState('overview');

  useEffect(() => {
    if (!loading && !user) router.push('/login');
    if (!loading && user && user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN') router.push('/dashboard');
  }, [user, loading, router]);

  if (loading) return <div className="flex min-h-[60vh] items-center justify-center">Loading...</div>;
  if (!user) return null;

  const stats = {
    totalVolunteers: 5247,
    activeVolunteers: 4891,
    eventsConducted: 128,
    donationAmount: 2850000,
    projectsRunning: 12,
  };

  const volunteerGrowth = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{ label: 'New Volunteers', data: [120, 190, 150, 220, 180, 250], backgroundColor: '#2563EB', borderRadius: 8 }],
  };

  const donationChart = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{ label: 'Donations (₹)', data: [450000, 380000, 520000, 410000, 490000, 600000], borderColor: '#14B8A6', backgroundColor: 'rgba(20,184,166,0.1)', fill: true, tension: 0.4 }],
  };

  const pendingVolunteers = [
    { id: '1', fullName: 'Rahul Verma', city: 'Mumbai', email: 'rahul@email.com', createdAt: '2026-06-10' },
    { id: '2', fullName: 'Sneha Patel', city: 'Ahmedabad', email: 'sneha@email.com', createdAt: '2026-06-11' },
    { id: '3', fullName: 'Arjun Singh', city: 'Jaipur', email: 'arjun@email.com', createdAt: '2026-06-12' },
  ];

  const recentDonations = [
    { id: '1', donorName: 'Anonymous', amount: 5000, createdAt: '2026-06-12' },
    { id: '2', donorName: 'Priya Sharma', amount: 10000, createdAt: '2026-06-11' },
    { id: '3', donorName: 'Tech Corp Ltd', amount: 50000, createdAt: '2026-06-10' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage volunteers, events, projects, and donations</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm"><Download className="h-4 w-4" /> Export</Button>
            <Button variant="outline" size="sm"><Settings className="h-4 w-4" /> Settings</Button>
          </div>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { label: 'Total Volunteers', value: stats.totalVolunteers.toLocaleString(), icon: Users, color: 'bg-primary/10 text-primary' },
            { label: 'Active Volunteers', value: stats.activeVolunteers.toLocaleString(), icon: CheckCircle, color: 'bg-success/10 text-success' },
            { label: 'Events Conducted', value: stats.eventsConducted, icon: Calendar, color: 'bg-secondary/10 text-secondary' },
            { label: 'Total Donations', value: formatCurrency(stats.donationAmount), icon: DollarSign, color: 'bg-accent/10 text-accent' },
            { label: 'Active Projects', value: stats.projectsRunning, icon: FolderKanban, color: 'bg-primary/10 text-primary' },
          ].map((stat) => (
            <Card key={stat.label} className="border-none shadow-soft">
              <CardContent className="p-4">
                <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <p className="text-xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {['overview', 'volunteers', 'events', 'projects', 'donations', 'reports'].map((t) => (
            <Button key={t} variant={tab === t ? 'default' : 'outline'} size="sm" onClick={() => setTab(t)} className="capitalize">{t}</Button>
          ))}
        </div>

        {tab === 'overview' && (
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-none shadow-soft">
              <CardHeader><CardTitle className="flex items-center gap-2"><BarChart3 className="h-5 w-5" /> Volunteer Growth</CardTitle></CardHeader>
              <CardContent><Bar data={volunteerGrowth} options={{ responsive: true, plugins: { legend: { display: false } } }} /></CardContent>
            </Card>
            <Card className="border-none shadow-soft">
              <CardHeader><CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5" /> Donation Analytics</CardTitle></CardHeader>
              <CardContent><Line data={donationChart} options={{ responsive: true, plugins: { legend: { display: false } } }} /></CardContent>
            </Card>
            <Card className="border-none shadow-soft">
              <CardHeader><CardTitle>Pending Approvals ({pendingVolunteers.length})</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {pendingVolunteers.map((v) => (
                  <div key={v.id} className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                    <div>
                      <p className="font-medium">{v.fullName}</p>
                      <p className="text-xs text-muted-foreground">{v.city} • {v.email}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" className="text-success"><CheckCircle className="h-4 w-4" /></Button>
                      <Button size="sm" variant="ghost" className="text-error"><XCircle className="h-4 w-4" /></Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="border-none shadow-soft">
              <CardHeader><CardTitle>Recent Donations</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {recentDonations.map((d) => (
                  <div key={d.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{d.donorName}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(d.createdAt)}</p>
                    </div>
                    <p className="font-bold text-primary">{formatCurrency(d.amount)}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {tab === 'volunteers' && (
          <Card className="border-none shadow-soft">
            <CardContent className="p-6">
              <div className="mb-4 flex justify-between">
                <h3 className="font-heading text-lg font-semibold">All Volunteers</h3>
                <Button variant="outline" size="sm"><Download className="h-4 w-4" /> Export Excel</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b text-left">
                    <th className="pb-3 pr-4">Name</th><th className="pb-3 pr-4">City</th><th className="pb-3 pr-4">Status</th><th className="pb-3">Actions</th>
                  </tr></thead>
                  <tbody>
                    {[...pendingVolunteers, { id: '4', fullName: 'Meera Joshi', city: 'Pune', email: 'meera@email.com', createdAt: '2026-05-01', status: 'APPROVED' }].map((v) => (
                      <tr key={v.id} className="border-b">
                        <td className="py-3 pr-4 font-medium">{v.fullName}</td>
                        <td className="py-3 pr-4 text-muted-foreground">{v.city}</td>
                        <td className="py-3 pr-4"><span className={cn('rounded-full px-2 py-1 text-xs', statusColors[(v as {status?: string}).status || 'PENDING'])}>{(v as {status?: string}).status || 'PENDING'}</span></td>
                        <td className="py-3"><Button variant="ghost" size="sm">View</Button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {tab !== 'overview' && tab !== 'volunteers' && (
          <Card className="border-none shadow-soft">
            <CardContent className="flex flex-col items-center justify-center p-12 text-center">
              <FolderKanban className="mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="font-heading text-lg font-semibold capitalize">{tab} Management</h3>
              <p className="mt-2 text-muted-foreground">Manage content from the public pages.</p>
              <Button className="mt-4" asChild><Link href={`/${tab === 'donations' ? 'donate' : tab}`}>View Public Page</Link></Button>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
}
