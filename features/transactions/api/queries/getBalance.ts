import { api } from '@/lib/api/client';
import type { ISaldoResponseDTO } from '../../dto/transaction.response.dto';
import type { ITransactionSearch } from '../../model/transaction.search.types';

export async function getBalance(filters?: ITransactionSearch): Promise<number> {
  const params = new URLSearchParams();
  if (filters?.direcao !== undefined) params.set('direcao', String(filters.direcao));
  if (filters?.dataInicio) params.set('dataInicio', filters.dataInicio.toISOString().replace('Z', ''));
  if (filters?.dataFim) params.set('dataFim', filters.dataFim.toISOString().replace('Z', ''));

  const query = params.toString() ? `?${params.toString()}` : '';
  const response = await api.get<ISaldoResponseDTO>(`/transacoes/saldo${query}`);
  return response.saldo;
}
