'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { api } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { User, ShieldAlert, Loader2, Save } from 'lucide-react';
import { useState, useEffect } from 'react';

const profileSchema = z.object({
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  clan_name: z.string().optional().or(z.literal('')),
  bio: z.string().optional().or(z.literal('')),
  password: z.string().min(8, 'Password must be at least 8 characters').optional().or(z.literal('')),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const queryClient = useQueryClient();
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { data: profile, isLoading, isError } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await api.get('/khiladi/me/profile');
      return response.data;
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      email: '',
      clan_name: '',
      bio: '',
      password: '',
    },
  });

  useEffect(() => {
    if (profile) {
      reset({
        email: profile.email || '',
        clan_name: profile.clan_name || '',
        bio: profile.bio || '',
        password: '', // Never prefill password
      });
    }
  }, [profile, reset]);

  const updateMutation = useMutation({
    mutationFn: async (data: ProfileFormValues) => {
      const payload: any = {};
      
      // The Empty String Trap: remove any keys that are empty strings to prevent data wiping
      Object.entries(data).forEach(([key, value]) => {
        if (value !== '') {
          payload[key] = value;
        }
      });
      
      const response = await api.patch('/khiladi/me/updateProfile', payload);
      return response.data;
    },
    onSuccess: () => {
      setSuccessMsg('Profile successfully updated.');
      setErrorMsg(null);
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      reset((formValues) => ({ ...formValues, password: '' })); // Clear password field
      setTimeout(() => setSuccessMsg(null), 3000);
    },
    onError: (err: any) => {
      setSuccessMsg(null);
      setErrorMsg(err.response?.data?.detail || 'Failed to update profile.');
    },
  });

  const onSubmit = (data: ProfileFormValues) => {
    updateMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div className="flex items-center gap-6 mb-8">
          <Skeleton className="w-24 h-24 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <Card className="bg-card/40 border-border/50">
          <CardContent className="p-6 space-y-6">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-24 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="text-center space-y-4">
          <ShieldAlert className="w-12 h-12 text-destructive mx-auto" />
          <h2 className="text-2xl font-black uppercase tracking-widest text-destructive">Profile Corrupted</h2>
          <p className="text-muted-foreground">Failed to retrieve your Khiladi data.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-6 p-6 rounded-2xl bg-card/40 border border-border/50 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="relative z-10 w-24 h-24 rounded-full bg-secondary border-2 border-primary/50 flex items-center justify-center shadow-[0_0_15px_rgba(255,215,0,0.3)]">
          <User className="w-12 h-12 text-primary" />
        </div>
        <div className="relative z-10 space-y-1">
          <h1 className="text-3xl font-black uppercase tracking-tighter text-foreground drop-shadow-md">
            {profile.username}
          </h1>
          <p className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
            Level {profile.level || 1} Khiladi
            {profile.clan_name && (
              <span className="text-muted-foreground"> | Clan: {profile.clan_name}</span>
            )}
          </p>
          {profile.bio && (
            <p className="text-sm text-muted-foreground italic max-w-md line-clamp-2 mt-2 border-l-2 border-primary/50 pl-3">
              "{profile.bio}"
            </p>
          )}
        </div>
      </div>

      <Card className="bg-card/40 backdrop-blur-md border-border/50 shadow-xl">
        <CardHeader>
          <CardTitle className="uppercase tracking-widest font-black text-xl">Forge Your Identity</CardTitle>
          <CardDescription>Update your personal details and guild associations.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {successMsg && (
              <div className="p-3 rounded-md bg-success/20 border border-success text-success text-sm font-bold tracking-wide uppercase">
                {successMsg}
              </div>
            )}
            {errorMsg && (
              <div className="p-3 rounded-md bg-destructive/20 border border-destructive text-destructive text-sm font-bold tracking-wide uppercase">
                {errorMsg}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                className="bg-input/50 focus:border-primary"
                {...register('email')}
              />
              {errors.email && <p className="text-destructive text-xs">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="clan_name">Clan Name</Label>
              <Input
                id="clan_name"
                className="bg-input/50 focus:border-primary"
                {...register('clan_name')}
                placeholder="E.g. Shadow Hunters"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                className="bg-input/50 focus:border-primary min-h-[100px]"
                {...register('bio')}
                placeholder="Write your legend here..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">New Password (Optional)</Label>
              <Input
                id="password"
                type="password"
                className="bg-input/50 focus:border-primary"
                {...register('password')}
                placeholder="Leave blank to keep current password"
              />
              {errors.password && <p className="text-destructive text-xs">{errors.password.message}</p>}
            </div>

            <div className="pt-4 flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting || updateMutation.isPending}
                className="font-bold uppercase tracking-wider gap-2 shadow-[0_0_10px_rgba(255,215,0,0.3)] hover:shadow-[0_0_20px_rgba(255,215,0,0.5)] transition-shadow"
              >
                {isSubmitting || updateMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
