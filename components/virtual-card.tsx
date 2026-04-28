"use client";

import { useEffect, useState } from "react";
import { Wallet } from "lucide-react";

function randomDigits() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

export function VirtualCard() {
  const [digits, setDigits] = useState("1111");

  useEffect(() => {
    const id = setInterval(() => {
      setDigits(randomDigits());
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="relative isolate box-border grid h-[227px] min-w-[311px] w-[360px] grid-rows-[1fr_auto] overflow-hidden rounded-[10px] p-6 font-sans text-sm text-[#1a1d21] grayscale [background-image:url('https://assets.codepen.io/14762/tonys-pink.jpg')] bg-[length:360px_227px] shadow-[0_0_8px_rgb(0_0_0/12%),0_2px_16px_rgb(0_0_0/12%),0_4px_20px_rgb(0_0_0/12%),0_12px_28px_rgb(0_0_0/12%)] [animation:virtual-card-bg_10s_linear_infinite] transform-gpu"
    >
      <div className="pointer-events-none absolute inset-0 z-[1] rounded-[10px] shadow-[0_-1px_0_0_rgb(255_255_255_/0.9),0_1px_0_0_rgb(0_0_0/0.2)]" />

      <div
        className="pointer-events-none absolute inset-0 z-[1] rounded-[10px] bg-[linear-gradient(120deg,rgb(255_255_255/2%)_30%,rgb(255_255_255/25%)_40%,rgb(255_255_255/8%)_40%),linear-gradient(0deg,rgb(255_255_255/20%),rgb(255_255_255/30%))] bg-[length:150%_150%] [animation:virtual-card-shine_45s_ease-in-out_infinite]"
        aria-hidden
      />

      <div className="relative z-[2] flex items-start justify-between">
        <span className="text-sm font-medium uppercase tracking-[1.5px]">No Bolso</span>
        <Wallet size={30} strokeWidth={2} />
      </div>
      <div className="relative z-[2] flex items-start justify-between">
        <div className="grid gap-2">
          <p className="m-0 text-[10px] font-medium uppercase tracking-[1.5px]">Nome</p>
          <p className="m-0 max-w-[232px] truncate whitespace-nowrap text-base font-bold tracking-[1.5px] [text-shadow:0_0_8px_rgb(0_0_0/12%)]">
            **** **** **** {digits}
          </p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className='h-10 shrink-0 [filter:drop-shadow(0_1px_0_rgb(255_255_255/0.3))_drop-shadow(0_2px_16px_rgb(0_0_0/12%))_drop-shadow(0_0_12px_rgb(255_255_255))]'
          src="https://assets.codepen.io/14762/visa-virtual.svg"
          alt="Visa"
        />
      </div>
    </div>
  );
}
