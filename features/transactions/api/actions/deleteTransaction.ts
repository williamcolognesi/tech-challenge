'use server';

import { revalidatePath } from 'next/cache';
import { transactionService } from '@/lib/factories/transaction.factory';

export async function deleteTransaction(id: number) {
    await transactionService.deletar(id);
    revalidatePath('/dashboard');
    revalidatePath('/transactions');
}