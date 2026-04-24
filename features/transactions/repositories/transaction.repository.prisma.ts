import type { ITransactionRepository } from './transaction.repository.interface';
import type { ITransaction, TransactionDirection, TransactionType } from '../model/transaction.types';
import type { ITransactionInput } from '../model/transaction.inputs.types';
import type { ITransactionSearch } from '../model/transaction.search.types';
import { prisma } from '@/lib/prisma/client';


export class PrismaTransactionRepository implements ITransactionRepository {

    private mapear(data: any): ITransaction {
        return {
            id: data.id,
            valor: data.valor,
            tipo: data.tipo as TransactionType,
            direcao: data.direcao as TransactionDirection,
            descricao: data.descricao ?? undefined,
            dataCadastro: data.dataCadastro,
            dataAtualizacao: data.dataAtualizacao,
        };
    }

    async adicionar(input: ITransactionInput): Promise<ITransaction> {
        const data = await prisma.transaction.create({
            data: {
                valor: input.valor,
                tipo: input.tipo,
                direcao: input.direcao,
                descricao: input.descricao,
            },
        });
        return this.mapear(data);
    }

    async buscarPorId(id: number): Promise<ITransaction | null> {
        const data = await prisma.transaction.findUnique({
            where: { id },
        });
        return this.mapear(data);
    }

    async pesquisar(filters?: ITransactionSearch): Promise<ITransaction[]> {
        const data = await prisma.transaction.findMany({
            where: {
                tipo: filters?.tipo,
                direcao: filters?.direcao,
                descricao: filters?.descricao
                    ? { contains: filters.descricao, mode: 'insensitive' }
                    : undefined,
                dataCadastro: {
                    gte: filters?.dataInicio,
                    lte: filters?.dataFim,
                },
            },
            orderBy: { dataCadastro: 'desc' },
        });

        return data.map(d => this.mapear(d));
    }

    async atualizar(id: number, input: ITransactionInput): Promise<ITransaction | null> {
        const sanitized = Object.fromEntries(
            Object.entries(input).filter(([_, v]) => v !== undefined && v !== null)
        );

        const data = await prisma.transaction.update({
            where: { id },
            data: {
                ...sanitized,
                dataAtualizacao: new Date(),
            },
        });

        return this.mapear(data);
    }

    async deletar(id: number): Promise<boolean> {
        await prisma.transaction.delete({
            where: { id },
        });
        return true;
    }

    async buscarUltimasTransacoes(limit: number): Promise<ITransaction[]> {
        const data = await prisma.transaction.findMany({
            orderBy: { dataCadastro: 'desc' },
            take: limit,
        });

        return data.map(d => this.mapear(d));
    }

}