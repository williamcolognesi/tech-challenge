import { TRANSACTION_DIRECTION, type ITransactionRepository, type TransactionInput, type TransactionSearch } from '@/entities/transaction';

const MESSAGES = {
    NOT_FOUND: 'Transação não encontrada',
    INVALID_AMOUNT: 'O valor deve ser um número positivo',
    INVALID_RECENT_LIMIT: 'O limite deve ser um número positivo'
} as const;

export class TransactionService {
    constructor(private readonly repository: ITransactionRepository) { }

    async adicionar(input: TransactionInput) {
        this.validarValor(input.valor);
        return this.repository.adicionar(input);
    }

    async buscarPorId(id: number) {
        const transaction = await this.repository.buscarPorId(id);
        if (!transaction) throw new Error(MESSAGES.NOT_FOUND);
        return transaction;
    }

    async pesquisar(filters?: TransactionSearch) {
        return this.repository.pesquisar(filters);
    }

    async atualizar(id: number, input: TransactionInput) {
        this.validarValor(input.valor);
        const updated = await this.repository.atualizar(id, input);
        if (!updated) throw new Error(MESSAGES.NOT_FOUND);
        return updated;
    }

    async deletar(id: number) {
        const deleted = await this.repository.deletar(id);
        if (!deleted) throw new Error(MESSAGES.NOT_FOUND);
    }

    async buscarSaldo() {
        const all = await this.repository.pesquisar();

        return all.reduce((acc, t) => {
            return t.direcao === TRANSACTION_DIRECTION.ENTRADA.codigo
                ? acc + t.valor
                : acc - t.valor;
        }, 0);
    }

    async buscarUltimasTransacoes(limit: number = 4) {
        if (limit <= 0) throw new Error(MESSAGES.INVALID_RECENT_LIMIT);
        return this.repository.buscarUltimasTransacoes(limit);
    }

    private validarValor(valor: number = 0) {
        if (isNaN(valor) || valor <= 0)
            throw new Error(MESSAGES.INVALID_AMOUNT);
    }
}