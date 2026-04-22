import { transactionService } from '@/lib/factories/transaction.factory';
import type { ITransactionSearch } from '../../model/transaction.search.types';
import type { ITransaction } from '../../model/transaction.types';

export async function getTransactions(filters?: ITransactionSearch): Promise<ITransaction[]> {
    return transactionService.pesquisar(filters);
}