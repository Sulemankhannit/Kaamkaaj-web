import { api } from '@/lib/api';

export interface KaamCreatePayload {
  title: string;
  xp_reward: number;
  difficulty: 'easy' | 'medium' | 'hard' | 'epic';
  is_urgent: boolean;
  description?: string | null;
  requires_verification: boolean;
  deadline?: string | null;
}

export const createKaam = async (lakshyaId: number, data: KaamCreatePayload) => {
  const response = await api.post(`/kaam/lakshya/${lakshyaId}`, data);
  return response.data;
};

export const submitSaboot = async (kaamId: number, formData: FormData) => {
  const response = await api.patch(`/kaam/${kaamId}/submit`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getKaams = async (lakshyaId?: number) => {
  const url = lakshyaId ? `/kaam/?lakshya_id=${lakshyaId}` : `/kaam/`;
  const response = await api.get(url);
  return response.data;
};
