'use server';

import { revalidatePath } from 'next/cache';
import { transactionService } from '@/lib/factories/transaction.factory';
import type { ITransactionInput } from '../../model/transaction.inputs.types';
import { ITransaction } from '../../model/transaction.types';

export async function updateTransaction(id: number, input: ITransactionInput): Promise<ITransaction> {
    const transaction = await transactionService.atualizar(id, input);
    revalidatePath('/dashboard');
    revalidatePath('/transactions');
    return transaction;
}