import type { TransactionCategory, TransactionDirection, TransactionType } from "./transaction.types";

export interface ITransactionSearch {
  tipo?: TransactionType;
  direcao?: TransactionDirection;
  categoria?: TransactionCategory;
  descricao?: string;
  dataInicio?: Date;
  dataFim?: Date;
}