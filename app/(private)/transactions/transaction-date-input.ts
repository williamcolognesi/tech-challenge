/** Data local meia-noite no mesmo dia civil (evita deslocamento por fuso em payloads). */
export function startOfLocalDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/** Inicializa `Date` a partir da API (RSC pode serializar como string ISO). */
export function parseTransactionDate(d: Date | string): Date {
  const date = d instanceof Date ? d : new Date(d);
  if (Number.isNaN(date.getTime())) return startOfLocalDay(new Date());
  return startOfLocalDay(date);
}
