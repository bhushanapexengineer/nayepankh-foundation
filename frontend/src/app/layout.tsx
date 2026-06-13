import { ThemeProvider } from 'next-themes';
import { AuthProvider } from '@/lib/auth-context';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import './globals.css';

export const metadata = {
  title: {
    default: 'NayePankh Foundation - Empowering Communities, Transforming Lives',
    template: '%s | NayePankh Foundation',
  },
  description: 'NayePankh Foundation is dedicated to education, healthcare, women empowerment, and rural development across India.',
  keywords: ['NGO', 'non-profit', 'volunteer', 'donate', 'education', 'India', 'social work'],
  openGraph: {
    title: 'NayePankh Foundation',
    description: 'Empowering Communities, Transforming Lives',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-body antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
