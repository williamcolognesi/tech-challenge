import { type ITransactionRepository, type TransactionInput } from '@/entities/transaction';
import type { Transaction, TransactionSearch } from '@/entities/transaction';
import { MOCK_TRANSACTIONS } from '@/shared/mocks/data/transactions';

export class MockTransactionRepository implements ITransactionRepository {
    private store: Map<number, Transaction>;
    private nextId: number;

    constructor(seed: Transaction[] = MOCK_TRANSACTIONS) {
        this.store = new Map(seed.map(t => [t.id, t]));
        this.nextId = seed.length ? Math.max(...seed.map(t => t.id)) + 1 : 1;
    }

    async adicionar(input: TransactionInput): Promise<Transaction> {
        const id: number = this.nextId++;

        const transaction: Transaction = {
            id: id,
            valor: input.valor ?? 0,
            tipo: input.tipo,
            descricao: input.descricao,
            dataCadastro: new Date()
        };
        this.store.set(transaction.id, transaction);
        return transaction;
    }

    async buscarPorId(id: number): Promise<Transaction | null> {
        return this.store.get(id) ?? null;
    }

    async pesquisar(filters?: TransactionSearch): Promise<Transaction[]> {
        let results = Array.from(this.store.values());

        if (filters?.tipo)
            results = results.filter(t => t.tipo === filters.tipo);
        if (filters?.descricao)
            results = results.filter(t =>
                t.descricao?.toLowerCase().includes(filters.descricao!.toLowerCase())
            );

        return results.sort((a, b) => b.dataCadastro.getTime() - a.dataCadastro.getTime());
    }

    async atualizar(id: number, input: TransactionInput): Promise<Transaction | null> {
        const existing = this.store.get(id);
        if (!existing) return null;

        const updated: Transaction = { ...existing, ...input, dataAtualizacao: new Date() };
        this.store.set(id, updated);
        return updated;
    }

    async deletar(id: number): Promise<boolean> {
        return this.store.delete(id);
    }

    async buscarSaldo(): Promise<number> {
        let results = Array.from(this.store.values());
        return results.reduce((total, dados) => {
            return total + dados.valor;
        }, 0);
    }

    async buscarUltimasTransacoes(limit: number): Promise<Transaction[]> {
        let results = Array.from(this.store.values());
        return results
            .sort((a, b) => b.dataCadastro.getTime() - a.dataCadastro.getTime())
            .slice(0, limit);
    }

    reset(): void {
        this.store = new Map(MOCK_TRANSACTIONS.map(t => [t.id, t]));
    }
}