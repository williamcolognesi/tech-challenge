import { TransactionService } from '@/services/transaction/transaction.service';
import { MockTransactionRepository } from '@/infrastructure/transaction/transaction.repository.mock';

const repository = new MockTransactionRepository();

export const transactionService = new TransactionService(repository);