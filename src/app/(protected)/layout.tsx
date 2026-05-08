'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Target, User, LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

const NAV_ITEMS = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Lakshyas', href: '/lakshyas', icon: Target },
  { name: 'Profile', href: '/profile', icon: User },
];

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const handleLogout = () => {
    clearAuth();
    // Clear the middleware cookie
    document.cookie = 'auth-status=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-border bg-card/50 backdrop-blur-md h-screen sticky top-0">
        <div className="p-6">
          <h1 className="text-2xl font-black uppercase tracking-tighter text-primary drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]">
            KaamKaaj
          </h1>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-300 uppercase font-bold tracking-wider text-sm ${
                  isActive
                    ? 'bg-primary/10 text-primary border-l-2 border-primary shadow-[inset_4px_0_0_0_rgba(255,215,0,1)]'
                    : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]' : ''}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-md text-destructive hover:bg-destructive/10 transition-colors uppercase font-bold tracking-wider text-sm"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 pb-20 md:pb-0 relative overflow-hidden">
        {/* Ambient glow effects */}
        <div className="fixed top-[-20%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="fixed bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-destructive/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 h-full p-4 md:p-8 overflow-y-auto">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-border bg-card/80 backdrop-blur-xl z-50 px-6 py-2 flex justify-between items-center pb-safe">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
                isActive ? 'text-primary drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]' : 'text-muted-foreground'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-[10px] uppercase font-bold tracking-wider">{item.name}</span>
            </Link>
          );
        })}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center gap-1 p-2 rounded-lg text-destructive transition-colors"
        >
          <LogOut className="w-6 h-6" />
          <span className="text-[10px] uppercase font-bold tracking-wider">Logout</span>
        </button>
      </nav>
    </div>
  );
}
