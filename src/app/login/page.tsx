'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const setToken = useAuthStore((state) => state.setToken);
  const [error, setError] = useState<string | null>(null);

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
      // API expects application/x-www-form-urlencoded
      const formData = new URLSearchParams();
      formData.append('username', data.username);
      formData.append('password', data.password);
      // Optional: formData.append('grant_type', 'password');

      const response = await api.post('/login', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      // Assuming response returns an access_token
      const token = response.data.access_token;
      
      if (token) {
        setToken(token);
        
        // Set a cookie for Next.js middleware to detect authentication status
        document.cookie = "auth-status=authenticated; path=/; max-age=86400"; // 1 day expiry or similar
        
        router.push('/dashboard');
      } else {
        setError('No access token received from server.');
      }
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError('Incorrect username or password. Your aura is weak.');
      } else if (err.response?.data?.detail) {
        const detail = err.response.data.detail;
        setError(typeof detail === 'string' ? detail : 'Login failed');
      } else {
        setError('Network error or server is down.');
      }
    }
  };

  return (
    <div className="min-h-[100dvh] pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-destructive/10 rounded-full blur-3xl" />

      <Card className="w-full max-w-md bg-card/80 backdrop-blur-md border-border relative z-10">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold tracking-tighter text-center uppercase">
            Enter <span className="text-primary">KaamKaaj</span>
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Login to your Khiladi account to continue the grind.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <div className="p-3 rounded-md bg-destructive/20 border border-destructive text-destructive text-sm font-medium">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="shadow_hunter"
                className="bg-input/50 focus:border-primary"
                {...register('username')}
              />
              {errors.username && (
                <p className="text-destructive text-sm font-medium">{errors.username.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                {/* Future implementation <Link href="/forgot-password" className="text-xs text-primary hover:underline">Forgot password?</Link> */}
              </div>
              <Input
                id="password"
                type="password"
                className="bg-input/50 focus:border-primary"
                {...register('password')}
              />
              {errors.password && (
                <p className="text-destructive text-sm font-medium">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full font-bold uppercase tracking-wider text-primary-foreground bg-primary hover:bg-primary/90 mt-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                'Login'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground flex flex-col gap-2">
            <div>
              New to the guild?{' '}
              <Link href="/register" className="text-primary hover:underline font-bold">
                Create a Khiladi
              </Link>
            </div>
            <div>
              Account unverified?{' '}
              <Link href="/verify-otp" className="text-yellow-500 hover:underline font-bold">
                Verify Account
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
