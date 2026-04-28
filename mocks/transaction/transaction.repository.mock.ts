import type { ITransactionInput } from '@/features/transactions/model/transaction.inputs.types';
import type { ITransactionSearch } from '@/features/transactions/model/transaction.search.types';
import type { ITransaction } from '@/features/transactions/model/transaction.types';
import { ITransactionRepository } from '@/features/transactions/repositories/transaction.repository.interface';
import { MOCK_TRANSACTIONS } from '@/mocks/transaction/data/transactions';

export class MockTransactionRepository implements ITransactionRepository {
    private store: Map<number, ITransaction>;
    private nextId: number;

    constructor(seed: ITransaction[] = MOCK_TRANSACTIONS) {
        this.store = new Map(seed.map(t => [t.id, t]));
        this.nextId = this.calcularProximoId(MOCK_TRANSACTIONS);
    }

    async adicionar(input: ITransactionInput): Promise<ITransaction> {
        const id: number = this.nextId++;

        const transaction: ITransaction = {
            ...input,
            id: id,
            dataCadastro: new Date()
        };
        this.store.set(transaction.id, transaction);
        return transaction;
    }

    async buscarPorId(id: number): Promise<ITransaction | null> {
        return this.store.get(id) ?? null;
    }

    async pesquisar(filters?: ITransactionSearch): Promise<ITransaction[]> {
        let results = Array.from(this.store.values());

        if (filters?.tipo)
            results = results.filter(t => t.tipo === filters.tipo);
        if (filters?.direcao)
            results = results.filter(t => t.direcao === filters.direcao);
        if (filters?.categoria)
            results = results.filter(t => t.categoria === filters.categoria);
        if (filters?.descricao)
            results = results.filter(t =>
                t.descricao?.toLowerCase().includes(filters.descricao!.toLowerCase())
            );
        if (filters?.dataInicio)
            results = results.filter(t => t.dataTransacao >= filters.dataInicio!);
        if (filters?.dataFim)
            results = results.filter(t => t.dataTransacao <= filters.dataFim!);

        return results.sort((a, b) => b.dataTransacao.getTime() - a.dataTransacao.getTime());
    }

    async atualizar(id: number, input: ITransactionInput): Promise<ITransaction | null> {
        const existing = this.store.get(id);
        if (!existing) return null;

        const updated: ITransaction = { ...existing, ...input, dataAtualizacao: new Date() };
        this.store.set(id, updated);
        return updated;
    }

    async deletar(id: number): Promise<boolean> {
        return this.store.delete(id);
    }

    async buscarUltimasTransacoes(limit: number): Promise<ITransaction[]> {
        let results = Array.from(this.store.values());
        return results
            .sort((a, b) => b.dataTransacao.getTime() - a.dataTransacao.getTime())
            .slice(0, limit);
    }

    private calcularProximoId(seed: ITransaction[]): number {
        return seed.length ? Math.max(...seed.map(t => t.id)) + 1 : 1;
    }

    reset(): void {
        this.store = new Map(MOCK_TRANSACTIONS.map(t => [t.id, t]));
        this.nextId = this.calcularProximoId(MOCK_TRANSACTIONS);
    }
}