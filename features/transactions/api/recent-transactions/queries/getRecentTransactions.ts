import { transactionService } from '@/lib/transaction.factory';
import type { Transaction } from '@/entities/transaction';

const DEFAULTS = { LIMIT: 5 } as const;

export async function getRecentTransactions(limit = DEFAULTS.LIMIT): Promise<Transaction[]> {
    return transactionService.buscarUltimasTransacoes(limit);
}