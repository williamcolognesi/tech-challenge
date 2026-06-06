'use server';

import { revalidatePath } from 'next/cache';
import { api } from '@/lib/api/client';

export async function deleteTransaction(id: number): Promise<void> {
  await api.delete(`/transacoes/${id}`);
  revalidatePath('/dashboard');
  revalidatePath('/transactions');
}
