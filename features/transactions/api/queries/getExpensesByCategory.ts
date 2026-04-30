import { transactionService } from '@/lib/factories/transaction.factory';
import { TRANSACTION_CATEGORY, TRANSACTION_DIRECTION } from '../../model/constants';
import type { ITransaction } from '../../model/transaction.types';

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

const CATEGORY_COLORS: Record<number, string> = {
  [TRANSACTION_CATEGORY.ALIMENTACAO.codigo]: '#ef4444',
  [TRANSACTION_CATEGORY.LAZER.codigo]: '#f97316',
  [TRANSACTION_CATEGORY.ASSINATURA.codigo]: '#eab308',
  [TRANSACTION_CATEGORY.CASA.codigo]: '#06b6d4',
  [TRANSACTION_CATEGORY.EDUCACAO.codigo]: '#8b5cf6',
  [TRANSACTION_CATEGORY.RECEITAS_FIXAS.codigo]: '#22c55e',
  [TRANSACTION_CATEGORY.OUTROS.codigo]: '#6b7280',
};

function getCategoryName(codigo: number): string {
  const category = Object.values(TRANSACTION_CATEGORY).find((cat) => cat.codigo === codigo);
  return category?.descricao ?? 'Outros';
}

export async function getExpensesByCategory(): Promise<CategoryData[]> {
  const transactions = await transactionService.pesquisar({
    direcao: TRANSACTION_DIRECTION.SAIDA.codigo,
  });

  const categoryMap = new Map<number, number>();

  transactions.forEach((tx: ITransaction) => {
    if (tx.categoria !== undefined) {
      const current = categoryMap.get(tx.categoria) ?? 0;
      categoryMap.set(tx.categoria, current + tx.valor);
    }
  });

  const result: CategoryData[] = [];
  categoryMap.forEach((value, categoryCode) => {
    result.push({
      name: getCategoryName(categoryCode),
      value: Math.round(value * 100) / 100,
      color: CATEGORY_COLORS[categoryCode] ?? '#6b7280',
    });
  });

  return result.sort((a, b) => b.value - a.value);
}
