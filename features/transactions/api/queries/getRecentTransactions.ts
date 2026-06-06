import { api } from '@/lib/api/client';
import { toITransaction } from '../../mappers/transaction.mapper';
import type { ITransactionResponseDTO } from '../../dto/transaction.response.dto';
import type { ITransaction } from '../../model/transaction.types';

const DEFAULTS = { LIMIT: 5 } as const;

export async function getRecentTransactions(limit = DEFAULTS.LIMIT): Promise<ITransaction[]> {
  const response = await api.get<ITransactionResponseDTO[]>(`/transacoes/recentes?limit=${limit}`);
  return response.map(toITransaction);
}
