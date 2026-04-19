import { transactionService } from '@/shared/lib/transaction.factory';

export async function getBalance(): Promise<number> {
    return transactionService.buscarSaldo();
}