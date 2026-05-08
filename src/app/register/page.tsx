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

const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const calculatePasswordStrength = (password: string) => {
  let score = 0;
  if (!password) return score;
  if (password.length >= 8) score += 20;
  if (password.length >= 12) score += 20;
  if (/[A-Z]/.test(password)) score += 20;
  if (/[0-9]/.test(password)) score += 20;
  if (/[^A-Za-z0-9]/.test(password)) score += 20;
  return score;
};

const getStrengthColor = (score: number) => {
  if (score <= 40) return 'bg-destructive';
  if (score <= 80) return 'bg-yellow-500';
  return 'bg-success';
};

export default function RegisterPage() {
  const router = useRouter();
  const setRegistrationEmail = useAuthStore((state) => state.setRegistrationEmail);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const password = watch('password', '');
  const strengthScore = calculatePasswordStrength(password);

  const onSubmit = async (data: RegisterFormValues) => {
    setError(null);
    try {
      await api.post('/khiladiRegister/', data);
      setRegistrationEmail(data.email);
      router.push('/verify-otp');
    } catch (err: any) {
      if (err.response?.data?.detail) {
        // Handle validation errors or generic errors
        const detail = err.response.data.detail;
        if (typeof detail === 'string') {
          setError(detail);
        } else if (Array.isArray(detail)) {
          setError(detail[0]?.msg || 'Registration failed');
        } else {
          setError('An unexpected error occurred during registration.');
        }
      } else {
        setError('Network error or server is down.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-destructive/10 rounded-full blur-3xl" />

      <Card className="w-full max-w-md bg-card/80 backdrop-blur-md border-border relative z-10">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold tracking-tighter text-center uppercase">
            Join the <span className="text-primary">KaamKaaj</span>
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Create your Khiladi profile and start your journey.
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
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="hunter@guild.com"
                className="bg-input/50 focus:border-primary"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-destructive text-sm font-medium">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                className="bg-input/50 focus:border-primary"
                {...register('password')}
              />
              {errors.password && (
                <p className="text-destructive text-sm font-medium">{errors.password.message}</p>
              )}
              
              {/* Password Strength Meter */}
              {password && (
                <div className="space-y-1 mt-2">
                  <div className="flex justify-between text-xs font-medium text-muted-foreground">
                    <span>Strength</span>
                    <span>
                      {strengthScore <= 40 && 'Weak'}
                      {strengthScore > 40 && strengthScore <= 80 && 'Moderate'}
                      {strengthScore > 80 && 'Strong'}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-input rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ease-out ${getStrengthColor(strengthScore)}`}
                      style={{ width: `${Math.min(100, strengthScore)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full font-bold uppercase tracking-wider text-primary-foreground bg-primary hover:bg-primary/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Forging Profile...
                </>
              ) : (
                'Create Khiladi'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground flex flex-col gap-2">
            <div>
              Already in the guild?{' '}
              <Link href="/login" className="text-primary hover:underline font-bold">
                Login here
              </Link>
            </div>
            <div>
              Registered but unverified?{' '}
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
