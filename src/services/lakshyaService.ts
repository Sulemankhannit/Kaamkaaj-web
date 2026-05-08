import { api } from '@/lib/api';


// Assuming you'll add these types to your types/api.ts or define them here.
export interface LakshyaCreatePayload {
  title: string;
  deadline: string;
  description?: string | null;
}

export const getLakshyas = async () => {
  const response = await api.get('/khiladi/me/lakshyas');
  return response.data;
};

export const createLakshya = async (data: LakshyaCreatePayload) => {
  const response = await api.post('/khiladi/me/lakshyaBanao', data);
  return response.data;
};
