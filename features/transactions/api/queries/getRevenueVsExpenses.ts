import { transactionService } from '@/lib/factories/transaction.factory';
import { TRANSACTION_DIRECTION } from '../../model/constants';
import type { ITransaction } from '../../model/transaction.types';

interface ChartData {
  month: string;
  receitas: number;
  despesas: number;
}

const MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

function getMonthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

export async function getRevenueVsExpenses(monthsBack: number = 6): Promise<ChartData[]> {
  const transactions = await transactionService.pesquisar();

  const monthsMap = new Map<string, { receitas: number; despesas: number }>();
  const monthKeys: string[] = [];

  for (let i = monthsBack - 1; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const monthKey = getMonthKey(date);
    monthsMap.set(monthKey, { receitas: 0, despesas: 0 });
    monthKeys.push(monthKey);
  }

  transactions.forEach((tx: ITransaction) => {
    const monthKey = getMonthKey(new Date(tx.dataTransacao));
    
    if (monthsMap.has(monthKey)) {
      const data = monthsMap.get(monthKey)!;
      if (tx.direcao === TRANSACTION_DIRECTION.ENTRADA.codigo) {
        data.receitas += tx.valor;
      } else {
        data.despesas += tx.valor;
      }
    }
  });

  const result: ChartData[] = monthKeys.map((monthKey) => {
    const value = monthsMap.get(monthKey)!;
    const [year, month] = monthKey.split('-');
    const monthIndex = parseInt(month) - 1;
    const monthName = MONTHS[monthIndex];
    return {
      month: monthName,
      receitas: Math.round(value.receitas * 100) / 100,
      despesas: Math.round(value.despesas * 100) / 100,
    };
  });

  return result;
}
