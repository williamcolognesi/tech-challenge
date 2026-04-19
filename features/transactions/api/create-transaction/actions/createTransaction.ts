'use server';

import { revalidatePath } from 'next/cache';
import { transactionService } from '@/shared/lib/transaction.factory';
import type { TransactionInput } from '@/entities/transaction';

export async function createTransaction(input: TransactionInput) {
    const transaction = await transactionService.adicionar(input);
    revalidatePath('/dashboard');
    revalidatePath('/transactions');
    return transaction;
}