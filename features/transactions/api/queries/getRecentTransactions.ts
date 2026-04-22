import { transactionService } from '@/lib/factories/transaction.factory';
import type { ITransaction } from '../../model/transaction.types';

const DEFAULTS = { LIMIT: 5 } as const;

export async function getRecentTransactions(limit = DEFAULTS.LIMIT): Promise<ITransaction[]> {
    return transactionService.buscarUltimasTransacoes(limit);
}