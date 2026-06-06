import { api } from '@/lib/api/client';
import { toITransaction } from '../../mappers/transaction.mapper';
import type { ITransactionResponseDTO } from '../../dto/transaction.response.dto';
import type { ITransactionSearch } from '../../model/transaction.search.types';
import type { ITransaction } from '../../model/transaction.types';

export async function getTransactions(filters?: ITransactionSearch): Promise<ITransaction[]> {
  const params = new URLSearchParams();
  if (filters?.tipo !== undefined) params.set('tipo', String(filters.tipo));
  if (filters?.direcao !== undefined) params.set('direcao', String(filters.direcao));
  if (filters?.categoria !== undefined) params.set('categoria', String(filters.categoria));
  if (filters?.descricao) params.set('descricao', filters.descricao);
  if (filters?.dataInicio) params.set('dataInicio', filters.dataInicio.toISOString().replace('Z', ''));
  if (filters?.dataFim) params.set('dataFim', filters.dataFim.toISOString().replace('Z', ''));

  const query = params.toString() ? `?${params.toString()}` : '';
  const response = await api.get<ITransactionResponseDTO[]>(`/transacoes${query}`);
  return response.map(toITransaction);
}
