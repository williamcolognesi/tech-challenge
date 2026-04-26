import { getBalance } from "@/features/transactions/api/queries/getBalance";
import { getRecentTransactions } from "@/features/transactions/api/queries/getRecentTransactions";
import { TRANSACTION_DIRECTION } from "@/features/transactions/model/constants";
import { DashboardContent } from "./dashboard-content";

export default async function DashboardPage() {
  const balance = await getBalance();
  const income = await getBalance(
    undefined,
    undefined,
    TRANSACTION_DIRECTION.ENTRADA.codigo
  );
  const expense = await getBalance(
    undefined,
    undefined,
    TRANSACTION_DIRECTION.SAIDA.codigo
  );
  const recentTransactions = await getRecentTransactions();

  return (
    <DashboardContent
      balance={balance}
      income={income}
      expense={expense}
      recentTransactions={recentTransactions}
    />
  );
}
