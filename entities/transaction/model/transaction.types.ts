export const TRANSACTION_DIRECTION = {
  ENTRADA: {
    codigo: 1,
    descricao: 'Entrada',
  },
  SAIDA: {
    codigo: 2,
    descricao: 'Saída',
  },
} as const;

export type TransactionDirection = typeof TRANSACTION_DIRECTION[keyof typeof TRANSACTION_DIRECTION]['codigo'];

export const TRANSACTION_TYPE = {
  PIX: {
    codigo: 1,
    descricao: 'Pix',
  },
  DEPOSITO: {
    codigo: 2,
    descricao: 'Depósito',
  },
  TRANSFERENCIA: {
    codigo: 3,
    descricao: 'Transferência',
  },
  SAQUE: {
    codigo: 4,
    descricao: 'Saque',
  },
  OUTROS: {
    codigo: 5,
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
