"use client";

import Link from "next/link";
import { LogIn, Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VirtualCard } from "@/components/virtual-card";

import styles from "./page.module.scss";

export default function RegisterPage() {
  return (
    <div id={styles.register_page}>
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
          onSubmit={(e) => e.preventDefault()}
        >
          <h1 className={styles.form_title}>Criar conta</h1>

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
              autoComplete="new-password"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="confirm_password" className="sr-only">
              Confirmar senha
            </Label>
            <Input
              id="confirm_password"
              type="password"
              placeholder="********"
              autoComplete="new-password"
            />
          </div>

          <Button type="submit" size="lg" className="w-full">
            Criar conta
          </Button>

          <p className={styles.terms}>
            By clicking continue, you agree to our{" "}
            <Link href="#">Terms of Service</Link> and{" "}
            <Link href="#">Privacy Policy</Link>.
          </p>
        </form>

        <Link href="/login" className={styles.login_link}>
          <LogIn size={14} />
          Login
        </Link>
      </div>
    </div>
  );
}
