import { API_URL } from '@/lib/api/client';

export function getComprovanteUrl(comprovanteId: number): string {
  return `${API_URL}/comprovantes/${comprovanteId}`;
}
