"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Pencil,
  Trash2,
  Zap,
  Landmark,
  ArrowLeftRight,
  Banknote,
  CircleDollarSign,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { TRANSACTION_TYPE, TRANSACTION_DIRECTION } from "@/features/transactions/model/constants";
import type { ITransaction } from "@/features/transactions/model/transaction.types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { deleteTransaction } from "@/features/transactions/api/actions/deleteTransaction";

import { AddTransactionDialog } from "./add-transaction-dialog";
import { EditTransactionDialog } from "./edit-transaction-dialog";
import styles from "./page.module.scss";

interface Props {
  transactions: ITransaction[];
  balance: number;
  income: number;
  expense: number;
}

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function getTypeName(tipo: number) {
  const found = Object.values(TRANSACTION_TYPE).find((t) => t.codigo === tipo);
  return found?.descricao ?? "Outro";
}

function getTypeIcon(tipo: number) {
  switch (tipo) {
    case TRANSACTION_TYPE.PIX.codigo:
      return <Zap size={16} />;
    case TRANSACTION_TYPE.DEPOSITO.codigo:
      return <Landmark size={16} />;
    case TRANSACTION_TYPE.TRANSFERENCIA.codigo:
      return <ArrowLeftRight size={16} />;
    case TRANSACTION_TYPE.SAQUE.codigo:
      return <Banknote size={16} />;
    default:
      return <CircleDollarSign size={16} />;
  }
}

function groupByDay(transactions: ITransaction[]) {
  const groups: Record<string, ITransaction[]> = {};

  const sorted = [...transactions].sort(
    (a, b) =>
      new Date(b.dataCadastro).getTime() - new Date(a.dataCadastro).getTime()
  );

  for (const t of sorted) {
    const date = new Date(t.dataCadastro);
    const key = date.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "numeric",
    });
    if (!groups[key]) groups[key] = [];
    groups[key].push(t);
  }

  return groups;
}

function getMonthOptions() {
  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
  ];
  const year = new Date().getFullYear();
  return months.map((m, i) => ({
    label: `${m}, ${year}`,
    value: `${year}-${String(i + 1).padStart(2, "0")}`,
  }));
}

export function TransactionsContent({ transactions, balance, income, expense }: Props) {
  const router = useRouter();
  const [editingTransaction, setEditingTransaction] = useState<ITransaction | null>(null);
  const currentMonth = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`;
  const [month, setMonth] = useState(currentMonth);

  const filtered = transactions.filter((t) => {
    const d = new Date(t.dataCadastro);
    const tMonth = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    return tMonth === month;
  });

  const groups = groupByDay(filtered);
  const absExpense = Math.abs(expense);

  async function handleDelete(id: number) {
    await deleteTransaction(id);
    router.refresh();
    toast.success("Transação excluída com sucesso!");
  }

  function handleMutationDone() {
    router.refresh();
  }

  return (
    <div className={styles.page}>
      <div className={styles.top_bar}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <AddTransactionDialog onCreated={handleMutationDone} />

          <Select value={month} onValueChange={setMonth}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {getMonthOptions().map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className={styles.summary}>
          <div className={`${styles.balance} ${balance < 0 ? styles.negative : styles.positive}`}>
            Balanço: {formatCurrency(balance)}
          </div>
          <div className={`${styles.summary_line} ${styles.income}`}>
            Entradas: <span>{formatCurrency(income)}</span>
          </div>
          <div className={`${styles.summary_line} ${styles.expense}`}>
            Saídas: <span>{formatCurrency(absExpense)}</span>
          </div>
        </div>
      </div>

      <div className={styles.list_wrapper}>
        {Object.keys(groups).length === 0 && (
          <p style={{ textAlign: "center", color: "#6b7280", padding: 24 }}>
            Nenhuma transação neste período.
          </p>
        )}

        {Object.entries(groups).map(([day, items]) => (
          <div key={day} className={styles.day_group}>
            <div className={styles.day_label}>{day}</div>

            {items.map((t) => (
              <div key={t.id} className={styles.transaction_row}>
                <div className={styles.transaction_info}>
                  <Avatar>
                    <AvatarFallback>
                      {getTypeIcon(t.tipo)}
                    </AvatarFallback>
                  </Avatar>
                  <div className={styles.transaction_text}>
                    <div className={styles.transaction_type_row}>
                      <strong>{getTypeName(t.tipo)}</strong>
                      <span
                        className={
                          t.direcao === TRANSACTION_DIRECTION.ENTRADA.codigo
                            ? styles.badge_entrada
                            : styles.badge_saida
                        }
                      >
                        {t.direcao === TRANSACTION_DIRECTION.ENTRADA.codigo ? (
                          <><TrendingUp size={12} /> Entrada</>
                        ) : (
                          <><TrendingDown size={12} /> Saída</>
                        )}
                      </span>
                    </div>
                    <span>{t.descricao ?? "Sem descrição"}</span>
                  </div>
                </div>

                <div className={styles.transaction_actions}>
                  <span className={styles.transaction_value}>
                    {formatCurrency(t.valor)}
                  </span>
                  <div className={styles.transaction_buttons}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingTransaction(t)}
                  >
                    <Pencil size={14} />
                    Editar
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="icon-sm">
                        <Trash2 size={14} />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Excluir transação</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tem certeza que deseja excluir esta transação? Essa ação não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          variant="destructive"
                          onClick={() => handleDelete(t.id)}
                        >
                          Excluir
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {editingTransaction && (
        <EditTransactionDialog
          transaction={editingTransaction}
          onClose={() => {
            setEditingTransaction(null);
            handleMutationDone();
          }}
        />
      )}
    </div>
  );
}
