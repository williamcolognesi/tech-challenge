"use client";

import { useState, useMemo } from "react";
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

import { TRANSACTION_TYPE, TRANSACTION_DIRECTION, TRANSACTION_CATEGORY } from "@/features/transactions/model/constants";
import type { ITransaction, TransactionCategory } from "@/features/transactions/model/transaction.types";
import { calcularSaldo } from "@/features/transactions/utils/calculateBalance";
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
}

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function getTypeName(tipo: number) {
  const found = Object.values(TRANSACTION_TYPE).find((t) => t.codigo === tipo);
  return found?.descricao ?? "Outro";
}

function getCategoryLabel(categoria: TransactionCategory | undefined) {
  if (categoria == null) return "Sem categoria";
  const found = (Object.keys(TRANSACTION_CATEGORY) as (keyof typeof TRANSACTION_CATEGORY)[]).find(
    (key) => TRANSACTION_CATEGORY[key].codigo === categoria,
  );
  return found ? TRANSACTION_CATEGORY[found].descricao : "—";
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
      new Date(b.dataTransacao).getTime() - new Date(a.dataTransacao).getTime()
  );

  for (const t of sorted) {
    const date = new Date(t.dataTransacao);
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

export function TransactionsContent({ transactions }: Props) {
  const router = useRouter();
  const [editingTransaction, setEditingTransaction] = useState<ITransaction | null>(null);
  const currentMonth = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`;
  const [month, setMonth] = useState(currentMonth);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const filteredByMonth = transactions.filter((t) => {
    const d = new Date(t.dataTransacao);
    const tMonth = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    return tMonth === month;
  });

  const filtered = filteredByMonth.filter((t) => {
    if (categoryFilter === "all") return true;
    if (categoryFilter === "__none__") return t.categoria == null;
    return t.categoria === Number(categoryFilter);
  });

  let income = 0;
  let expenseAbs = 0;
  for (const t of filtered) {
    if (t.direcao === TRANSACTION_DIRECTION.ENTRADA.codigo) {
      income += t.valor;
    } else {
      expenseAbs += Math.abs(t.valor);
    }
  }
  const balance = calcularSaldo(filtered);

  const groups = groupByDay(filtered);

  /** Última transação exibida (global) não leva linha inferior. */
  const isLastTxInGlobalList = useMemo(() => {
    const ids = Object.entries(groups).flatMap(([, items]) => items.map((t) => t.id));
    const lastId = ids[ids.length - 1];
    return new Map(ids.map((id) => [id, id === lastId] as const));
  }, [groups]);

  async function handleDelete(id: number) {
    await deleteTransaction(id);
    router.refresh();
    toast.success("Transação excluída com sucesso!");
  }

  function handleMutationDone() {
    router.refresh();
  }

  return (
    <div className="flex min-h-screen w-full flex-col gap-6 px-4 py-6 sm:gap-8 sm:p-6 md:p-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-6">
        <div className="flex w-full min-w-0 flex-col gap-3">
          <div className="flex min-w-0 gap-3">
            <div className="min-w-0 flex-1 sm:flex-none">
              <AddTransactionDialog onCreated={handleMutationDone} />
            </div>
            <Select value={month} onValueChange={setMonth}>
              <SelectTrigger className="h-11 min-h-11 min-w-0 flex-1 data-[size=default]:h-11 sm:h-10 sm:min-h-10 sm:min-w-[160px] sm:w-[180px] sm:flex-none sm:data-[size=default]:h-10">
                <SelectValue placeholder="Mês" />
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

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="h-11 min-h-11 w-full min-w-0 data-[size=default]:h-11 sm:h-10 sm:min-h-10 sm:min-w-[200px] sm:flex-1 sm:max-w-[320px] sm:data-[size=default]:h-10">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as categorias</SelectItem>
              <SelectItem value="__none__">Sem categoria</SelectItem>
              {(Object.keys(TRANSACTION_CATEGORY) as (keyof typeof TRANSACTION_CATEGORY)[]).map((key) => {
                const c = TRANSACTION_CATEGORY[key];
                return (
                  <SelectItem key={c.codigo} value={String(c.codigo)}>
                    {c.descricao}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5 text-center sm:text-left lg:shrink-0 lg:text-right">
          <div
            className={cn(
              "text-lg font-bold sm:text-xl",
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
            <span className="font-semibold text-red-600">{formatCurrency(expenseAbs)}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white px-4 py-5 sm:gap-6 sm:p-6">
        {Object.keys(groups).length === 0 && (
          <p className="px-2 py-6 text-center text-gray-500 sm:px-0">
            Nenhuma transação neste período.
          </p>
        )}

        {Object.entries(groups).map(([day, items]) => (
          <div key={day} className="flex flex-col gap-3">
            <div className="border-l-[3px] border-gray-300 pl-3 text-sm font-semibold capitalize text-neutral-900">
              {day}
            </div>

            {items.map((t) => (
              <div
                key={t.id}
                className={cn(
                  "flex flex-col gap-3 pb-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pb-4 sm:pt-4",
                  !isLastTxInGlobalList.get(t.id) && "border-b border-gray-200",
                )}
              >
                <div className="flex min-w-0 flex-1 items-start gap-3">
                  <Avatar className="size-9 shrink-0 sm:size-10">
                    <AvatarFallback className="text-neutral-600">
                      {getTypeIcon(t.tipo)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <strong className="text-sm font-semibold text-neutral-900">
                        {getTypeName(t.tipo)}
                      </strong>
                      <span
                        className={cn(
                          "inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold",
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
                    <span className="truncate text-[11px] font-medium uppercase tracking-wide text-gray-400">
                      {getCategoryLabel(t.categoria)}
                    </span>
                    <span className="line-clamp-2 text-xs text-gray-500">
                      {t.descricao ?? "Sem descrição"}
                    </span>
                  </div>
                </div>

                <div className="flex shrink-0 items-center justify-between gap-3 pt-1 sm:flex-col sm:items-end sm:justify-center sm:pt-0">
                  <span className="text-nowrap text-sm font-bold tabular-nums text-neutral-900 sm:text-base">
                    {formatCurrency(t.valor)}
                  </span>
                  <div className="flex shrink-0 items-center gap-1.5">
                    <Button
                      variant="outline"
                      size="sm"
                      className="inline-flex h-9 w-9 shrink-0 items-center justify-center p-0 sm:h-8 sm:min-h-8 sm:w-auto sm:gap-2 sm:px-3"
                      onClick={() => setEditingTransaction(t)}
                      title="Editar"
                      type="button"
                    >
                      <Pencil size={14} aria-hidden />
                      <span className="hidden sm:inline">Editar</span>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="icon-sm" title="Excluir" type="button">
                          <Trash2 size={14} aria-hidden />
                          <span className="sr-only">Excluir</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="mx-4 max-w-[calc(100vw-2rem)] sm:mx-auto">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Excluir transação</AlertDialogTitle>
                          <AlertDialogDescription>
                            Tem certeza que deseja excluir esta transação? Essa ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="flex-col gap-2 sm:flex-row sm:justify-end">
                          <AlertDialogCancel className="mt-0 w-full sm:w-auto">Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            variant="destructive"
                            className="w-full sm:w-auto"
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
          key={editingTransaction.id}
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
