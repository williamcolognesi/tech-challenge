import type { TransactionDirection, TransactionType } from "./transaction.types";

export interface ITransactionInput {
  valor: number;
  tipo: TransactionType;
  direcao: TransactionDirection;
  descricao?: string;
}