'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Loader2 } from 'lucide-react';
import { z } from 'zod';

export default function VerifyOtpPage() {
  const router = useRouter();
  const registrationEmail = useAuthStore((state) => state.registrationEmail);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const setRegistrationEmail = useAuthStore((state) => state.setRegistrationEmail);
  const [emailInput, setEmailInput] = useState('');

  // Handle cooldown timer
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const verifyOtp = async (code: string) => {
    if (!registrationEmail) return;
    setIsSubmitting(true);
    setError(null);

    try {
      await api.post('/khiladi/verify-otp', {
        email: registrationEmail,
        user_otp: code,
      });
      // Clear the registration email from store once verified
      useAuthStore.getState().setRegistrationEmail(null);
      router.push('/login');
    } catch (err: any) {
      const detail = err.response?.data?.detail;
      setError(typeof detail === 'string' ? detail : 'Invalid OTP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpChange = (value: string) => {
    setOtp(value);
    if (value.length === 6) {
      verifyOtp(value);
    }
  };

  const resendOtp = async () => {
    if (!registrationEmail || cooldown > 0) return;
    
    try {
      await api.post('/khiladi/resendOtp/', {
        email: registrationEmail,
      });
      setCooldown(60); // 60s cooldown
    } catch (err: any) {
      const detail = err.response?.data?.detail;
      setError(typeof detail === 'string' ? detail : 'Failed to resend OTP.');
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (z.string().email().safeParse(emailInput).success) {
      setRegistrationEmail(emailInput);
    } else {
      setError('Please enter a valid email address.');
    }
  };

  if (!registrationEmail) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <Card className="w-full max-w-md bg-card/80 backdrop-blur-md border-border relative z-10 text-center">
          <CardHeader>
            <CardTitle className="text-3xl font-bold tracking-tighter uppercase">
              Identify <span className="text-primary">Khiladi</span>
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter your registered email to continue verification.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-md bg-destructive/20 border border-destructive text-destructive text-sm font-medium">
                  {error}
                </div>
              )}
              <div className="space-y-2 text-left">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="hunter@guild.com"
                  className="flex h-10 w-full rounded-md border border-input bg-input/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50"
                  required
                />
              </div>
              <Button type="submit" className="w-full font-bold uppercase tracking-wider text-primary-foreground bg-primary hover:bg-primary/90">
                Proceed to OTP
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-destructive/10 rounded-full blur-3xl" />

      <Card className="w-full max-w-md bg-card/80 backdrop-blur-md border-border relative z-10 text-center">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold tracking-tighter uppercase">
            Verify Your <span className="text-primary">Aura</span>
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter the 6-digit verification code sent to <br />
            <span className="font-bold text-foreground">{registrationEmail}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 flex flex-col items-center">
          {error && (
            <div className="w-full p-3 rounded-md bg-destructive/20 border border-destructive text-destructive text-sm font-medium">
              {error}
            </div>
          )}

          <InputOTP
            maxLength={6}
            value={otp}
            onChange={handleOtpChange}
            disabled={isSubmitting}
          >
            <InputOTPGroup className="gap-2">
              {[...Array(6)].map((_, index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className="w-12 h-14 text-xl border-2 border-input focus-visible:border-primary focus-visible:ring-primary/20 rounded-md bg-background/50"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>

          {isSubmitting && (
            <div className="flex items-center text-primary text-sm font-medium">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying Aura...
            </div>
          )}

          <div className="w-full pt-4 border-t border-border mt-4">
            <p className="text-sm text-muted-foreground mb-3">Didn't receive the code?</p>
            <Button
              variant="outline"
              className="w-full font-bold uppercase tracking-wider"
              onClick={resendOtp}
              disabled={cooldown > 0 || isSubmitting}
            >
              {cooldown > 0 ? `Resend available in ${cooldown}s` : 'Resend OTP'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
