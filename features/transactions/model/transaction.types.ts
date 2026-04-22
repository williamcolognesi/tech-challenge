import { TRANSACTION_DIRECTION, TRANSACTION_TYPE } from "./constants";

export type TransactionDirection = typeof TRANSACTION_DIRECTION[keyof typeof TRANSACTION_DIRECTION]['codigo'];

export type TransactionType = typeof TRANSACTION_TYPE[keyof typeof TRANSACTION_TYPE]['codigo'];

export interface ITransaction {
  id: number;
  valor: number;
  tipo: TransactionType;
  direcao: TransactionDirection;
  descricao?: string;
  dataCadastro: Date;
  dataAtualizacao?: Date;
}