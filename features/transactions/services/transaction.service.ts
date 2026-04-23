import { TRANSACTION_DIRECTION } from '../model/constants';
import type { ITransactionInput } from '../model/transaction.inputs.types';
import type { ITransactionSearch } from '../model/transaction.search.types';
import { ITransaction } from '../model/transaction.types';
import { ITransactionRepository } from '../repositories/transaction.repository.interface';

const MESSAGES = {
    NOT_FOUND: 'Transação não encontrada',
    INVALID_AMOUNT: 'O valor deve ser um número positivo',
    INVALID_RECENT_LIMIT: 'O limite deve ser um número positivo',
    DATA_INVALIDA: 'Data de início não pode ser maior que a data fim',
} as const;

export class TransactionService {
    constructor(private readonly repository: ITransactionRepository) { }

    async adicionar(input: ITransactionInput): Promise<ITransaction> {
        this.validarValor(input.valor);
        return this.repository.adicionar(input);
    }

    async buscarPorId(id: number): Promise<ITransaction> {
        const transaction = await this.repository.buscarPorId(id);
        if (!transaction) throw new Error(MESSAGES.NOT_FOUND);
        return transaction;
    }

    async pesquisar(filters?: ITransactionSearch): Promise<ITransaction[]> {
        if (filters?.dataInicio && filters?.dataFim) {
            if (filters.dataInicio > filters.dataFim)
                throw new Error(MESSAGES.DATA_INVALIDA);
        }
        return this.repository.pesquisar(filters);
    }

    async atualizar(id: number, input: ITransactionInput): Promise<ITransaction> {
        this.validarValor(input.valor);
        const updated = await this.repository.atualizar(id, input);
        if (!updated) throw new Error(MESSAGES.NOT_FOUND);
        return updated;
    }

    async deletar(id: number): Promise<void> {
        const deleted = await this.repository.deletar(id);
        if (!deleted) throw new Error(MESSAGES.NOT_FOUND);
    }

    async buscarSaldo(): Promise<number> {
        const all = await this.repository.pesquisar();

        return all.reduce((acc, t) => {
            return t.direcao === TRANSACTION_DIRECTION.ENTRADA.codigo
                ? acc + t.valor
                : acc - t.valor;
        }, 0);
    }

    async buscarUltimasTransacoes(limit: number): Promise<ITransaction[]> {
        if (limit <= 0) throw new Error(MESSAGES.INVALID_RECENT_LIMIT);
        return this.repository.buscarUltimasTransacoes(limit);
    }

    private validarValor(valor: number = 0) {
        if (isNaN(valor) || valor <= 0)
            throw new Error(MESSAGES.INVALID_AMOUNT);
    }
}