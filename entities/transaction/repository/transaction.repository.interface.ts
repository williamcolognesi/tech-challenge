import { Transaction, TransactionInput, TransactionSearch } from "../model/transaction.types";

export interface ITransactionRepository {
    adicionar(input: TransactionInput): Promise<Transaction>;
    buscarPorId(id: number): Promise<Transaction | null>;
    pesquisar(filters?: TransactionSearch): Promise<Transaction[]>;
    atualizar(id: number, input: TransactionInput): Promise<Transaction | null>;
    deletar(id: number): Promise<boolean>;
    buscarUltimasTransacoes(limit: number): Promise<Transaction[]>;
}