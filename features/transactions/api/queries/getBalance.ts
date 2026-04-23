import { transactionService } from '@/lib/factories/transaction.factory';

export async function getBalance(dataInicio?: Date, dataFim?: Date): Promise<number> {
    return transactionService.buscarSaldo(dataInicio, dataFim);
}