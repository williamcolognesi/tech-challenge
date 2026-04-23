"use client";

import { useEffect, useState } from "react";
import { Wallet } from "lucide-react";

import styles from "./virtual-card.module.scss";

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
    <div className={styles.card}>
      <div className={styles.card_top}>
        <span>No Bolso</span>
        <Wallet size={30} strokeWidth={2} />
      </div>
      <div className={styles.card_bottom}>
        <div className={styles.card_name}>
          <p>Nome</p>
          <p>**** **** **** {digits}</p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://assets.codepen.io/14762/visa-virtual.svg"
          alt="Visa"
        />
      </div>
    </div>
  );
}
