'use server';

import { api } from '@/lib/api/client';
import type { IComprovanteResponseDTO } from '../../dto/transaction.response.dto';

export async function uploadComprovante(file: File): Promise<IComprovanteResponseDTO> {
  const formData = new FormData();
  formData.append('arquivo', file);

  return api.postFile<IComprovanteResponseDTO>('/comprovantes', formData);
}
