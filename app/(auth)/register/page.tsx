"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogIn, Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VirtualCard } from "@/components/virtual-card";

const cardSlotClasses =
  "flex flex-1 w-full flex-col items-center justify-center [&>*]:transition-[margin-bottom] [&>*]:duration-500 [&>*]:ease-in-out [&>*:nth-child(1)]:z-[1] [&>*:nth-child(1)]:mb-[-190px] [&>*:nth-child(2)]:z-[2] [&>*:nth-child(2)]:mb-[-190px] [&>*:nth-child(3)]:z-[3] [&:has(>*:hover)>*:nth-child(1)]:mb-4 [&:has(>*:hover)>*:nth-child(2)]:mb-4";

export default function RegisterPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/login");
  };

  return (
    <div className="flex h-screen w-screen">
      <div className="hidden h-full min-[1000px]:flex min-[1000px]:w-1/2 flex-col items-start justify-start gap-8 bg-[#f5f5f5] p-[30px]">
        <div className="flex items-center gap-2 text-lg font-bold text-neutral-900">
          <Wallet size={20} strokeWidth={2} />
          <span>No Bolso.</span>
        </div>
        <div className={cardSlotClasses}>
          <VirtualCard />
          <VirtualCard />
          <VirtualCard />
        </div>
      </div>

      <div className="relative flex h-full w-full flex-col items-center justify-center bg-white p-[30px] min-[1000px]:w-1/2">
        <div className="absolute left-[30px] top-[30px] flex min-[1000px]:hidden items-center gap-2 text-lg font-bold text-neutral-900">
          <Wallet size={20} strokeWidth={2} />
          <span>No Bolso.</span>
        </div>

        <form
          className="flex w-full max-w-[350px] flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <h1 className="mb-2 text-center text-2xl font-bold text-neutral-900">
            Criar conta
          </h1>

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

          <p className="text-center text-xs leading-relaxed text-gray-500 [&_a]:text-neutral-900 [&_a]:underline">
            By clicking continue, you agree to our{" "}
            <Link href="#">Terms of Service</Link> and{" "}
            <Link href="#">Privacy Policy</Link>.
          </p>
        </form>

        <Link
          href="/login"
          className="mt-10 inline-flex items-center gap-1.5 text-sm text-neutral-900 no-underline"
        >
          <LogIn size={14} />
          Login
        </Link>
      </div>
    </div>
  );
}
