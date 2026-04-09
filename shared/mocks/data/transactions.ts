import { Transaction, TransactionType } from "@/entities/transaction";

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 1,
    valor: 1500.00,
    tipo: TransactionType.DEPOSITO,
    descricao: 'Salário março',
    dataCadastro: new Date('2024-03-01T09:00:00'),
    dataAtualizacao: new Date('2024-03-01T09:00:00'),
  },
  {
    id: 2,
    valor: 250.00,
    tipo: TransactionType.PIX,
    descricao: 'Pagamento aluguel',
    dataCadastro: new Date('2024-03-05T14:30:00'),
    dataAtualizacao: new Date('2024-03-05T14:30:00'),
  },
  {
    id: 3,
    valor: 800.00,
    tipo: TransactionType.TRANSFERENCIA,
    descricao: 'Transferência poupança',
    dataCadastro: new Date('2024-03-10T11:00:00'),
    dataAtualizacao: new Date('2024-03-10T11:00:00'),
  }
];