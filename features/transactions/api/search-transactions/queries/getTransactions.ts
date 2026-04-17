import { transactionService } from '@/shared/lib/transaction.factory';
import type { Transaction, TransactionSearch } from '@/entities/transaction';

export async function getTransactions(filters?: TransactionSearch): Promise<Transaction[]> {
    return transactionService.pesquisar(filters);
}