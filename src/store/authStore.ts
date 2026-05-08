import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  registrationEmail: string | null;
  setToken: (token: string) => void;
  setRegistrationEmail: (email: string | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      registrationEmail: null,
      setToken: (token: string) => set({ token }),
      setRegistrationEmail: (email: string | null) => set({ registrationEmail: email }),
      clearAuth: () => set({ token: null, registrationEmail: null }),
    }),
    {
      name: 'kaamkaaj-auth-storage', // name of the item in the storage (must be unique)
    }
  )
);
