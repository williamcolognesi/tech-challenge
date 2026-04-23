import { TRANSACTION_DIRECTION } from "../model/constants";
import { ITransaction } from "../model/transaction.types";

export function calcularSaldo(transactions: ITransaction[]): number {
    return transactions.reduce((acc, t) =>
        t.direcao === TRANSACTION_DIRECTION.ENTRADA.codigo
            ? acc + t.valor
            : acc - t.valor
        , 0);
}