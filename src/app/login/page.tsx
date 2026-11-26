'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { api } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  AlertCircle,
  ArrowLeft,
  Camera,
  ChevronRight,
  Eye,
  EyeOff,
  Flame,
  Loader2,
  Shield,
} from 'lucide-react';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function setAuthStatusCookie() {
  document.cookie = 'auth-status=authenticated; path=/; max-age=86400; SameSite=Lax';
}

export default function LoginPage() {
  const router = useRouter();
  const setToken = useAuthStore((state) => state.setToken);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setError(null);
    try {
      const formData = new URLSearchParams();
      formData.append('username', data.username);
      formData.append('password', data.password);

      const response = await api.post('/login', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const token = response.data?.access_token as string | undefined;

      if (token) {
        setToken(token);
        setAuthStatusCookie();
        router.push('/dashboard');
      } else {
        setError('No access token received from server.');
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          setError('Incorrect username or password. Check your credentials and try again.');
        } else if (typeof err.response?.data?.detail === 'string') {
          setError(err.response.data.detail);
        } else {
          setError('Unable to sign in. Please try again.');
        }
      } else {
        setError('Network error or server is unreachable.');
      }
    }
  };

  return (
    <div className="min-h-[100dvh] pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] bg-background text-foreground flex flex-col">
      {/* Minimal Top Bar */}
      <header className="border-b border-border/80 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to KaamKaaj
          </Link>

          <Link
            href="/register"
            className="text-sm font-semibold text-primary hover:underline"
          >
            Create Khiladi
          </Link>
        </div>
      </header>

      {/* Main Split Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-10">
        <div className="w-full max-w-5xl grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Brand & Protocol Context (Desktop) */}
          <div className="hidden lg:block lg:col-span-6 space-y-8 pr-4">
            <div className="flex items-center gap-3">
              <Image
                src="/icon.png"
                alt="KaamKaaj logo"
                width={44}
                height={44}
                className="rounded-xl border border-primary/35"
                priority
              />
              <span className="font-display text-2xl font-bold uppercase tracking-wider text-foreground">
                KaamKaaj
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="font-display text-4xl xl:text-5xl font-bold uppercase tracking-tight leading-[1.06] text-foreground">
                Step back into the <span className="text-primary">arena.</span>
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed max-w-md">
                Your Lakshyas, active Kaams, and streak are waiting. Submit today&apos;s Saboot
                before the Reaper checks the clock.
              </p>
            </div>

            <div className="space-y-3 pt-2 border-t border-border">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Camera className="w-4 h-4 text-[#39ff14] shrink-0" />
                <span>Photo Saboot verified by the AI Game Master</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Flame className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Daily streaks protected only by real completions</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 text-primary shrink-0" />
                <span>Missed days trigger Shadow Realm XP Debt</span>
              </div>
            </div>
          </div>

          {/* Right: Login Form Surface */}
          <div className="lg:col-span-6 w-full max-w-md mx-auto lg:max-w-none">
            <div className="rounded-2xl bg-card border border-border p-6 sm:p-8 space-y-6">
              {/* Mobile Brand Header */}
              <div className="flex lg:hidden items-center gap-2.5 pb-4 border-b border-border">
                <Image
                  src="/icon.png"
                  alt="KaamKaaj logo"
                  width={34}
                  height={34}
                  className="rounded-lg border border-primary/35"
                  priority
                />
                <span className="font-display text-lg font-bold uppercase tracking-wider text-foreground">
                  KaamKaaj
                </span>
              </div>

              <div className="space-y-1.5">
                <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-foreground">
                  Enter the Guild
                </h2>
                <p className="text-sm text-muted-foreground">
                  Sign in with your Khiladi username and password.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                {error && (
                  <div
                    role="alert"
                    className="flex items-start gap-2.5 p-3.5 rounded-xl bg-destructive/10 border border-destructive/40 text-destructive text-sm font-medium"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="username" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    autoComplete="username"
                    placeholder="your_username"
                    aria-invalid={errors.username ? 'true' : 'false'}
                    className="h-11 bg-background border-border focus-visible:border-primary"
                    {...register('username')}
                  />
                  {errors.username && (
                    <p className="text-destructive text-xs font-medium">{errors.username.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      placeholder="••••••••"
                      aria-invalid={errors.password ? 'true' : 'false'}
                      className="h-11 pr-11 bg-background border-border focus-visible:border-primary"
                      {...register('password')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="absolute right-0 top-0 h-11 w-11 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-destructive text-xs font-medium">{errors.password.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 font-bold uppercase tracking-wider text-primary-foreground bg-primary hover:bg-primary/90 rounded-md"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Entering Guild...
                    </>
                  ) : (
                    <>
                      Login
                      <ChevronRight className="ml-1.5 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              <div className="pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-muted-foreground">
                <span>
                  New to KaamKaaj?{' '}
                  <Link href="/register" className="text-primary hover:underline font-bold">
                    Create a Khiladi
                  </Link>
                </span>
                <span>
                  Unverified?{' '}
                  <Link href="/verify-otp" className="text-foreground hover:text-primary underline underline-offset-4 font-semibold">
                    Verify OTP
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
