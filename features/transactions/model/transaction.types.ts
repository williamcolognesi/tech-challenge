import { TRANSACTION_CATEGORY, TRANSACTION_DIRECTION, TRANSACTION_TYPE } from "./constants";

export type TransactionDirection = typeof TRANSACTION_DIRECTION[keyof typeof TRANSACTION_DIRECTION]['codigo'];

export type TransactionType = typeof TRANSACTION_TYPE[keyof typeof TRANSACTION_TYPE]['codigo'];

export type TransactionCategory = typeof TRANSACTION_CATEGORY[keyof typeof TRANSACTION_CATEGORY]['codigo'];

export interface ITransaction {
  id: number;
  valor: number;
  tipo: TransactionType;
  direcao: TransactionDirection;
  categoria?: TransactionCategory;
  descricao?: string;
  dataCadastro: Date;
  dataAtualizacao?: Date;
}