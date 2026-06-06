import { api } from '@/lib/api/client';
import { toITransaction } from '../../mappers/transaction.mapper';
import type { ITransactionResponseDTO } from '../../dto/transaction.response.dto';
import type { ITransaction } from '../../model/transaction.types';

export async function getTransactionById(id: number): Promise<ITransaction> {
  const response = await api.get<ITransactionResponseDTO>(`/transacoes/${id}`);
  return toITransaction(response);
}
