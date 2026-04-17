import { NextRequest, NextResponse } from 'next/server';
import type { TransactionDirection, TransactionInput, TransactionSearch } from '@/entities/transaction';
import { TransactionType } from '@/entities/transaction';
import { transactionService } from '@/shared/lib/transaction.factory';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = req.nextUrl;

        const filters: TransactionSearch = {
            tipo: (searchParams.get('tipo') as TransactionType) ?? undefined,
            direcao: (searchParams.get('direcao') as TransactionDirection) ?? undefined,
            descricao: searchParams.get('descricao') ?? undefined
        };

        const transactions = await transactionService.pesquisar(filters);
        return NextResponse.json(transactions);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const input: TransactionInput = await req.json();
        const transaction = await transactionService.adicionar(input);
        return NextResponse.json(transaction, { status: 201 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}