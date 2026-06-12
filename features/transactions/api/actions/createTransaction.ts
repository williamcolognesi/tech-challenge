'use server';

import { revalidatePath } from 'next/cache';
import { api } from '@/lib/api/client';
import { toITransaction } from '../../mappers/transaction.mapper';
import type { ITransactionResponseDTO } from '../../dto/transaction.response.dto';
import type { ITransactionInput } from '../../model/transaction.inputs.types';
import type { ITransaction } from '../../model/transaction.types';

export async function createTransaction(input: ITransactionInput): Promise<ITransaction> {
  const response = await api.post<ITransactionResponseDTO>('/transacoes', {
    valor: input.valor,
    tipo: input.tipo,
    direcao: input.direcao,
    categoria: input.categoria,
    descricao: input.descricao,
    dataTransacao: input.dataTransacao.toISOString(),
    comprovanteId: input.comprovanteId,
  });
  revalidatePath('/dashboard');
  revalidatePath('/transactions');
  return toITransaction(response);
}
