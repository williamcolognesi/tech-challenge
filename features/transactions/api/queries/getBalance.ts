import { transactionService } from '@/lib/factories/transaction.factory';
import { TransactionDirection } from '../../model/transaction.types';

export async function getBalance(dataInicio?: Date, dataFim?: Date, direcao?: TransactionDirection): Promise<number> {
    return transactionService.buscarSaldo(dataInicio, dataFim, direcao);
}