"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogIn, Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VirtualCard } from "@/components/virtual-card";

import styles from "./page.module.scss";

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div id={styles.login_page}>
      <div className={styles.left_container}>
        <div className={styles.brand}>
          <Wallet size={20} strokeWidth={2} />
          <span>No Bolso.</span>
        </div>
        <div className={styles.card_slot}>
          <VirtualCard />
          <VirtualCard />
          <VirtualCard />
        </div>
      </div>

      <div className={styles.right_container}>
        <div className={styles.mobile_brand}>
          <Wallet size={20} strokeWidth={2} />
          <span>No Bolso.</span>
        </div>

        <form
          className={styles.form_wrapper}
          onSubmit={handleSubmit}
        >
          <h1 className={styles.form_title}>Entrar na conta</h1>

          <div className="grid gap-2">
            <Label htmlFor="email" className="sr-only">
              E-mail
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              autoComplete="email"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password" className="sr-only">
              Senha
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              autoComplete="current-password"
            />
          </div>

          <Button type="submit" size="lg" className="w-full">
            Entrar
          </Button>
        </form>

        <Link href="/register" className={styles.register_link}>
          <LogIn size={14} />
          Cadastrar
        </Link>
      </div>
    </div>
  );
}
