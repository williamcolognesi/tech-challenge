import { transactionService } from '@/lib/factories/transaction.factory';
import { ITransactionSearch } from '../../model/transaction.search.types';

export async function getBalance(filters?: ITransactionSearch): Promise<number> {
    return transactionService.buscarSaldo(filters);
}