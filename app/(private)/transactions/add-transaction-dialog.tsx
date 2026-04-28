"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
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

import { TRANSACTION_TYPE, TRANSACTION_DIRECTION, TRANSACTION_CATEGORY } from "@/features/transactions/model/constants";
import type { TransactionCategory, TransactionDirection, TransactionType } from "@/features/transactions/model/transaction.types";
import { createTransaction } from "@/features/transactions/api/actions/createTransaction";

import { toast } from "sonner";
import { formatCurrencyInput, parseCurrencyInput } from "./currency-utils";

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
      categoria:
        categoria === "__none__"
          ? undefined
          : (Number(categoria) as TransactionCategory),
      descricao: descricao || undefined,
    });

    setValor("");
    setDescricao("");
    setTipo(String(TRANSACTION_TYPE.PIX.codigo));
    setDirecao(String(TRANSACTION_DIRECTION.SAIDA.codigo));
    setCategoria("__none__");
    setOpen(false);
    onCreated();
    toast.success("Transação adicionada com sucesso!");
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
