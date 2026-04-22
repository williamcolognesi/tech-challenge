import { transactionService } from '@/lib/factories/transaction.factory';

export async function getBalance(): Promise<number> {
    return transactionService.buscarSaldo();
}