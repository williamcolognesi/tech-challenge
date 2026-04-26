import { PrismaTransactionRepository } from '@/features/transactions/repositories/transaction.repository.prisma';
import { TransactionService } from '@/features/transactions/services/transaction.service';
import { MockTransactionRepository } from '@/mocks/transaction/transaction.repository.mock';

const useMock = process.env.USE_MOCK === 'true';

const repository = useMock
    ? new MockTransactionRepository()
    : new PrismaTransactionRepository();

export const transactionService = new TransactionService(repository);