export enum TransactionType {
  PIX = 'PIX',
  DEPOSITO = 'DEPOSITO',
  TRANSFERENCIA = 'TRANSFERENCIA',
}

export interface Transaction {
  id: number;
  valor: number;
  tipo?: TransactionType;
  descricao?: string;
  dataCadastro: Date;
  dataAtualizacao?: Date;
}

export interface TransactionInput {
  valor?: number;
  tipo?: TransactionType;
  descricao?: string;
}