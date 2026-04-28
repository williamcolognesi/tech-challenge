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

import { cn } from "@/lib/utils";

import { AddTransactionDialog } from "./add-transaction-dialog";
import { EditTransactionDialog } from "./edit-transaction-dialog";

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
    <div className="flex min-h-screen w-full flex-col gap-6 p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
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

        <div className="flex flex-col gap-1 text-right">
          <div
            className={cn(
              "text-xl font-bold",
              balance < 0 ? "text-red-600" : "text-green-600",
            )}
          >
            Balanço: {formatCurrency(balance)}
          </div>
          <div className="text-[13px] text-[#555]">
            Entradas:{" "}
            <span className="font-semibold text-green-600">{formatCurrency(income)}</span>
          </div>
          <div className="text-[13px] text-[#555]">
            Saídas:{" "}
            <span className="font-semibold text-red-600">{formatCurrency(absExpense)}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 rounded-xl border border-gray-200 bg-white p-6">
        {Object.keys(groups).length === 0 && (
          <p className="p-6 text-center text-gray-500">Nenhuma transação neste período.</p>
        )}

        {Object.entries(groups).map(([day, items]) => (
          <div key={day} className="flex flex-col gap-3">
            <div className="border-l-[3px] border-gray-300 pl-3 text-sm font-semibold text-neutral-900">
              {day}
            </div>

            {items.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between gap-4 px-3 py-2"
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>
                      {getTypeIcon(t.tipo)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <strong className="text-sm font-semibold text-neutral-900">
                        {getTypeName(t.tipo)}
                      </strong>
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-semibold",
                          t.direcao === TRANSACTION_DIRECTION.ENTRADA.codigo
                            ? "!bg-green-100 !text-green-600"
                            : "!bg-red-100 !text-red-600",
                        )}
                      >
                        {t.direcao === TRANSACTION_DIRECTION.ENTRADA.codigo ? (
                          <><TrendingUp size={12} /> Entrada</>
                        ) : (
                          <><TrendingDown size={12} /> Saída</>
                        )}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {t.descricao ?? "Sem descrição"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1.5">
                  <span className="text-nowrap text-base font-bold text-neutral-900">
                    {formatCurrency(t.valor)}
                  </span>
                  <div className="flex items-center gap-2">
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
