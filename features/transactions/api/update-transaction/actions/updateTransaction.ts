'use server';

import { revalidatePath } from 'next/cache';
import { transactionService } from '@/shared/lib/transaction.factory';
import type { TransactionInput } from '@/entities/transaction';

export async function updateTransaction(id: number, input: TransactionInput) {
    const transaction = await transactionService.atualizar(id, input);
    revalidatePath('/dashboard');
    revalidatePath('/transactions');
    return transaction;
}