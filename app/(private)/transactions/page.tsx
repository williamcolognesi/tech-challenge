import { getTransactions } from "@/features/transactions/api/queries/getTransactions";
import { getBalance } from "@/features/transactions/api/queries/getBalance";
import { TRANSACTION_DIRECTION } from "@/features/transactions/model/constants";
import { TransactionsContent } from "./transactions-content";

export default async function TransactionsPage() {
  const transactions = await getTransactions();
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

  return (
    <TransactionsContent
      transactions={transactions}
      balance={balance}
      income={income}
      expense={expense}
    />
  );
}
