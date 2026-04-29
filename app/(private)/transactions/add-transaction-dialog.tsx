"use client";

import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { TRANSACTION_TYPE, TRANSACTION_DIRECTION, TRANSACTION_CATEGORY } from "@/features/transactions/model/constants";
import type { TransactionCategory, TransactionDirection, TransactionType } from "@/features/transactions/model/transaction.types";
import { createTransaction } from "@/features/transactions/api/actions/createTransaction";

import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { formatCurrencyInput, parseCurrencyInput } from "./currency-utils";
import { startOfLocalDay } from "./transaction-date-input";

interface Props {
  onCreated: () => void;
}

export function AddTransactionDialog({ onCreated }: Props) {
  const [open, setOpen] = useState(false);
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState(String(TRANSACTION_TYPE.PIX.codigo));
  const [direcao, setDirecao] = useState(String(TRANSACTION_DIRECTION.SAIDA.codigo));
  const [categoria, setCategoria] = useState("__none__");
  const [dataTransacao, setDataTransacao] = useState(() => startOfLocalDay(new Date()));
  const [dataPopoverOpen, setDataPopoverOpen] = useState(false);

  function handleValorChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValor(formatCurrencyInput(e.target.value));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const parsedValor = parseCurrencyInput(valor);
    if (parsedValor <= 0) return;

    await createTransaction({
      valor: parsedValor,
      tipo: Number(tipo) as TransactionType,
      direcao: Number(direcao) as TransactionDirection,
      dataTransacao,
      categoria:
        categoria === "__none__"
          ? undefined
          : (Number(categoria) as TransactionCategory),
      descricao: descricao || undefined,
    });

    setValor("");
    setDescricao("");
    setDataTransacao(startOfLocalDay(new Date()));
    setTipo(String(TRANSACTION_TYPE.PIX.codigo));
    setDirecao(String(TRANSACTION_DIRECTION.SAIDA.codigo));
    setCategoria("__none__");
    setOpen(false);
    onCreated();
    toast.success("Transação adicionada com sucesso!");
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setDataPopoverOpen(false);
      }}
    >
      <DialogTrigger asChild>
        <Button type="button" className="h-11 w-full sm:h-10 sm:w-auto">
          Adicionar item
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar transação</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="add-valor" className="text-sm font-semibold text-neutral-900">
              Valor*
            </Label>
            <Input
              id="add-valor"
              placeholder="R$ 0,00"
              value={valor}
              onChange={handleValorChange}
              inputMode="numeric"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="add-data-transacao" className="text-sm font-semibold text-neutral-900">
              Data da transação*
            </Label>
            <Popover modal={false} open={dataPopoverOpen} onOpenChange={setDataPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  id="add-data-transacao"
                  type="button"
                  variant="outline"
                  className={cn("h-11 w-full justify-start px-3 text-left font-normal sm:h-10")}
                  aria-expanded={dataPopoverOpen}
                >
                  <CalendarIcon className="mr-2 size-4 shrink-0 opacity-60" aria-hidden />
                  {format(dataTransacao, "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="z-[100] w-auto overflow-hidden p-0"
                align="start"
                sideOffset={8}
              >
                <Calendar
                  mode="single"
                  captionLayout="dropdown"
                  selected={dataTransacao}
                  defaultMonth={dataTransacao}
                  onSelect={(d) => {
                    if (d) {
                      setDataTransacao(startOfLocalDay(d));
                      setDataPopoverOpen(false);
                    }
                  }}
                  locale={ptBR}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="add-descricao" className="text-sm font-semibold text-neutral-900">
              Descrição
            </Label>
            <Input
              id="add-descricao"
              placeholder="Dinheiro que emprestei pro mercado"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label className="text-sm font-semibold text-neutral-900">Tipo</Label>
            <Select value={tipo} onValueChange={setTipo}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.values(TRANSACTION_TYPE).map((t) => (
                  <SelectItem key={t.codigo} value={String(t.codigo)}>
                    {t.descricao}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label className="text-sm font-semibold text-neutral-900">Direção</Label>
            <Select value={direcao} onValueChange={setDirecao}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.values(TRANSACTION_DIRECTION).map((d) => (
                  <SelectItem key={d.codigo} value={String(d.codigo)}>
                    {d.descricao}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label className="text-sm font-semibold text-neutral-900">Categoria</Label>
            <Select value={categoria} onValueChange={setCategoria}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
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

          <Button type="submit" className="self-center">
            Adicionar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
