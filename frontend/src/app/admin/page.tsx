'use client';

import dynamic from 'next/dynamic';

const AdminDashboardContent = dynamic(() => import('./admin-content'), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[60vh] items-center justify-center">
      <p className="text-muted-foreground">Loading dashboard...</p>
    </div>
  ),
});

export default function AdminPage() {
  return <AdminDashboardContent />;
}
