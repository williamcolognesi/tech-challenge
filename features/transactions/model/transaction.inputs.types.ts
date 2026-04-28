import type { TransactionCategory, TransactionDirection, TransactionType } from "./transaction.types";

export interface ITransactionInput {
  valor: number;
  tipo: TransactionType;
  direcao: TransactionDirection;
  categoria?: TransactionCategory;
  descricao?: string;
  dataTransacao: Date;
}