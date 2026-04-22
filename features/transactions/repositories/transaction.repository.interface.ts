import type { ITransactionInput } from "../model/transaction.inputs.types";
import type { ITransactionSearch } from "../model/transaction.search.types";
import type { ITransaction } from "../model/transaction.types";

export interface ITransactionRepository {
    adicionar(input: ITransactionInput): Promise<ITransaction>;
    buscarPorId(id: number): Promise<ITransaction | null>;
    pesquisar(filters?: ITransactionSearch): Promise<ITransaction[]>;
    atualizar(id: number, input: ITransactionInput): Promise<ITransaction | null>;
    deletar(id: number): Promise<boolean>;
    buscarUltimasTransacoes(limit: number): Promise<ITransaction[]>;
}