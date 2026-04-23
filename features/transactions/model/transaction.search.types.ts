import type { TransactionDirection, TransactionType } from "./transaction.types";

export interface ITransactionSearch {
  tipo?: TransactionType;
  direcao?: TransactionDirection;
  descricao?: string;
  dataInicio?: Date;
  dataFim?: Date;
}