import type { ITransaction, ITransactionComprovante, TransactionType, TransactionDirection, TransactionCategory } from '../model/transaction.types';
import type { ITransactionResponseDTO } from '../dto/transaction.response.dto';

export function toITransaction(dto: ITransactionResponseDTO): ITransaction {
  const comprovante: ITransactionComprovante | undefined = dto.comprovante
    ? { id: dto.comprovante.id, nome: dto.comprovante.nome, contentType: dto.comprovante.contentType }
    : undefined;

  return {
    id: dto.id,
    valor: dto.valor,
    tipo: dto.tipo.codigo as TransactionType,
    direcao: dto.direcao.codigo as TransactionDirection,
    categoria: dto.categoria?.codigo as TransactionCategory | undefined,
    descricao: dto.descricao,
    dataTransacao: new Date(dto.dataTransacao),
    dataCadastro: new Date(dto.dataCadastro),
    dataAtualizacao: dto.dataAtualizacao ? new Date(dto.dataAtualizacao) : undefined,
    comprovante,
  };
}
