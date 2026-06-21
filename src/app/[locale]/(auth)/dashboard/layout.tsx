import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { DashboardHeader } from '@/features/dashboard/DashboardHeader';
import { auth0 } from '@/lib/auth0';

type DashboardLayoutProps = {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: 'Earth Bullies — Admin',
  description: 'Manage dogs, litters, puppies, photos and inquiries for Earth Bullies.',
};

export default async function DashboardLayout(props: DashboardLayoutProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  // Defense in depth — the middleware already gates /dashboard, but guard the
  // server render too so the admin is never shown without an Auth0 session.
  const session = await auth0.getSession();
  if (!session) {
    redirect('/auth/login');
  }

  return (
    <>
      <div className="shadow-md">
        <div className="
          mx-auto flex max-w-7xl items-center justify-between px-3 py-4
        "
        >
          <DashboardHeader
            menu={[
              { href: '/dashboard', label: 'Overview' },
              { href: '/dashboard/dogs', label: 'Dogs' },
              { href: '/dashboard/litters', label: 'Litters' },
              { href: '/dashboard/puppies', label: 'Puppies' },
              { href: '/dashboard/gallery', label: 'Gallery' },
              { href: '/dashboard/leads', label: 'Inquiries' },
              { href: '/dashboard/settings', label: 'Settings' },
            ]}
          />
        </div>
      </div>

      <div className="min-h-[calc(100vh-72px)] bg-muted">
        <div className="mx-auto max-w-7xl px-3 pt-6 pb-16">
          {props.children}
        </div>
      </div>
    </>
  );
}

export const dynamic = 'force-dynamic';
