import { transactionService } from '@/shared/lib/transaction.factory';
import type { Transaction } from '@/entities/transaction';

export async function getTransactionById(id: number): Promise<Transaction> {
    return transactionService.buscarPorId(id);
}