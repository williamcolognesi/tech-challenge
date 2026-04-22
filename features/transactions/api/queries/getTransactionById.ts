import { transactionService } from '@/lib/factories/transaction.factory';
import type { ITransaction } from '../../model/transaction.types';

export async function getTransactionById(id: number): Promise<ITransaction> {
    return transactionService.buscarPorId(id);
}