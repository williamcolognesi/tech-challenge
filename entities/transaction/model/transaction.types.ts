export const TRANSACTION_DIRECTION = {
  ENTRADA: {
    codigo: 'ENTRADA',
    descricao: 'Entrada',
  },
  SAIDA: {
    codigo: 'SAIDA',
    descricao: 'Saída',
  },
} as const;

export type TransactionDirection = typeof TRANSACTION_DIRECTION[keyof typeof TRANSACTION_DIRECTION]['codigo'];

export const TRANSACTION_TYPE = {
  PIX: {
    codigo: 'PIX',
    descricao: 'Pix',
  },
  DEPOSITO: {
    codigo: 'DEPOSITO',
    descricao: 'Depósito',
  },
  TRANSFERENCIA: {
    codigo: 'TRANSFERENCIA',
    descricao: 'Transferência',
  },
  OUTROS: {
    codigo: 'OUTROS',
    descricao: 'Outros',
  },
} as const;

export type TransactionType = typeof TRANSACTION_TYPE[keyof typeof TRANSACTION_TYPE]['codigo'];

export interface Transaction {
  id: number;
  valor: number;
  tipo: TransactionType;
  direcao: TransactionDirection;
  descricao?: string;
  dataCadastro: Date;
  dataAtualizacao?: Date;
}

export interface TransactionInput {
  valor: number;
  tipo: TransactionType;
  direcao: TransactionDirection;
  descricao?: string;
}

export interface TransactionSearch {
  tipo?: TransactionType;
  direcao?: TransactionDirection;
  descricao?: string;
}
