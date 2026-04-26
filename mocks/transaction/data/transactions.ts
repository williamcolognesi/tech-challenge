import { TRANSACTION_DIRECTION, TRANSACTION_TYPE } from "@/features/transactions/model/constants";
import type { ITransaction } from "@/features/transactions/model/transaction.types";

function daysAgo(days: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d;
}

export const MOCK_TRANSACTIONS: ITransaction[] = [
  {
    id: 1,
    valor: 1500.00,
    tipo: TRANSACTION_TYPE.DEPOSITO.codigo,
    direcao: TRANSACTION_DIRECTION.ENTRADA.codigo,
    descricao: 'Salário mensal',
    dataCadastro: daysAgo(2),
    dataAtualizacao: daysAgo(2),
  },
  {
    id: 2,
    valor: 250.00,
    tipo: TRANSACTION_TYPE.PIX.codigo,
    direcao: TRANSACTION_DIRECTION.SAIDA.codigo,
    descricao: 'Pagamento aluguel',
    dataCadastro: daysAgo(5),
    dataAtualizacao: daysAgo(5),
  },
  {
    id: 3,
    valor: 800.00,
    tipo: TRANSACTION_TYPE.TRANSFERENCIA.codigo,
    direcao: TRANSACTION_DIRECTION.ENTRADA.codigo,
    descricao: 'Transferência poupança',
    dataCadastro: daysAgo(10),
    dataAtualizacao: daysAgo(10),
  }
];