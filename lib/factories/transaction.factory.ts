import { PrismaTransactionRepository } from '@/features/transactions/repositories/transaction.repository.prisma';
import { TransactionService } from '@/features/transactions/services/transaction.service';
//import { MockTransactionRepository } from '@/mocks/transaction/transaction.repository.mock';

//const repository = new MockTransactionRepository();
const repository = new PrismaTransactionRepository();

export const transactionService = new TransactionService(repository);