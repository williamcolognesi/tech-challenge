import { TransactionService } from '@/features/transactions/services/transaction.service';
import { MockTransactionRepository } from '@/mocks/transaction/transaction.repository.mock';

const repository = new MockTransactionRepository();

export const transactionService = new TransactionService(repository);