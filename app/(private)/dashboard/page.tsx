import { getBalance } from "@/features/transactions/api/queries/getBalance";
import { getRecentTransactions } from "@/features/transactions/api/queries/getRecentTransactions";
import { getRevenueVsExpenses } from "@/features/transactions/api/queries/getRevenueVsExpenses";
import { getExpensesByCategory } from "@/features/transactions/api/queries/getExpensesByCategory";
import { TRANSACTION_DIRECTION } from "@/features/transactions/model/constants";
import { DashboardContent } from "./dashboard-content";

export default async function DashboardPage() {
  const balance = await getBalance();
  const income = await getBalance({
    direcao: TRANSACTION_DIRECTION.ENTRADA.codigo,
  });
  const expense = await getBalance({
    direcao: TRANSACTION_DIRECTION.SAIDA.codigo,
  });
  const recentTransactions = await getRecentTransactions();
  const revenueVsExpenses = await getRevenueVsExpenses();
  const expensesByCategory = await getExpensesByCategory();

  return (
    <DashboardContent
      balance={balance}
      income={income}
      expense={expense}
      recentTransactions={recentTransactions}
      revenueVsExpenses={revenueVsExpenses}
      expensesByCategory={expensesByCategory}
    />
  );
}
