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
} from "@/components/ui/dialog";

import { TRANSACTION_TYPE, TRANSACTION_DIRECTION } from "@/features/transactions/model/constants";
import type { ITransaction } from "@/features/transactions/model/transaction.types";
import { updateTransaction } from "@/features/transactions/api/actions/updateTransaction";

import { toast } from "sonner";
import { formatCurrencyInput, parseCurrencyInput } from "./currency-utils";

interface Props {
  transaction: ITransaction;
  onClose: () => void;
}

function toMaskedValue(value: number): string {
  const cents = Math.round(value * 100).toString();
  return formatCurrencyInput(cents);
}

export function EditTransactionDialog({ transaction, onClose }: Props) {
  const [valor, setValor] = useState(toMaskedValue(transaction.valor));
  const [descricao, setDescricao] = useState(transaction.descricao ?? "");
  const [tipo, setTipo] = useState(String(transaction.tipo));
  const [direcao, setDirecao] = useState(String(transaction.direcao));

  function handleValorChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValor(formatCurrencyInput(e.target.value));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const parsedValor = parseCurrencyInput(valor);
    if (parsedValor <= 0) return;

    await updateTransaction(transaction.id, {
      valor: parsedValor,
      tipo: Number(tipo) as 1 | 2 | 3 | 4 | 5,
      direcao: Number(direcao) as 1 | 2,
      descricao: descricao || undefined,
    });

    onClose();
    toast.success("Transação atualizada com sucesso!");
  }

  return (
    <Dialog open onOpenChange={(v) => !v && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar transação</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="edit-valor" className="text-sm font-semibold text-neutral-900">
              Valor*
            </Label>
            <Input
              id="edit-valor"
              placeholder="R$ 0,00"
              value={valor}
              onChange={handleValorChange}
              inputMode="numeric"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="edit-descricao" className="text-sm font-semibold text-neutral-900">
              Descrição
            </Label>
            <Input
              id="edit-descricao"
              placeholder="Descrição da transação"
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

          <Button type="submit" className="self-center">
            Salvar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
