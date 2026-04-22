'use server';

import { revalidatePath } from 'next/cache';
import { transactionService } from '@/lib/factories/transaction.factory';
import type { ITransactionInput } from '../../model/transaction.inputs.types';

export async function createTransaction(input: ITransactionInput) {
    const transaction = await transactionService.adicionar(input);
    revalidatePath('/dashboard');
    revalidatePath('/transactions');
    return transaction;
}