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

import { TRANSACTION_TYPE, TRANSACTION_DIRECTION } from "@/features/transactions/model/constants";
import { createTransaction } from "@/features/transactions/api/actions/createTransaction";

import { toast } from "sonner";
import { formatCurrencyInput, parseCurrencyInput } from "./currency-utils";
import styles from "./page.module.scss";

interface Props {
  onCreated: () => void;
}

export function AddTransactionDialog({ onCreated }: Props) {
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState(String(TRANSACTION_TYPE.PIX.codigo));
  const [direcao, setDirecao] = useState(String(TRANSACTION_DIRECTION.SAIDA.codigo));

  function handleValorChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValor(formatCurrencyInput(e.target.value));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const parsedValor = parseCurrencyInput(valor);
    if (parsedValor <= 0) return;

    await createTransaction({
      valor: parsedValor,
      tipo: Number(tipo) as 1 | 2 | 3 | 4 | 5,
      direcao: Number(direcao) as 1 | 2,
      descricao: descricao || nome || undefined,
    });

    setNome("");
    setValor("");
    setDescricao("");
    setTipo(String(TRANSACTION_TYPE.PIX.codigo));
    setDirecao(String(TRANSACTION_DIRECTION.SAIDA.codigo));
    setOpen(false);
    onCreated();
    toast.success("Transação adicionada com sucesso!");
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Adicionar item</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar transação</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className={styles.form_group}>
            <Label htmlFor="add-nome" className={styles.form_label}>
              Nome*
            </Label>
            <Input
              id="add-nome"
              placeholder="Pix mãe"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className={styles.form_group}>
            <Label htmlFor="add-valor" className={styles.form_label}>
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

          <div className={styles.form_group}>
            <Label htmlFor="add-descricao" className={styles.form_label}>
              Descrição
            </Label>
            <Input
              id="add-descricao"
              placeholder="Dinheiro que emprestei pro mercado"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>

          <div className={styles.form_group}>
            <Label className={styles.form_label}>Tipo</Label>
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

          <div className={styles.form_group}>
            <Label className={styles.form_label}>Direção</Label>
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
            Adicionar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
