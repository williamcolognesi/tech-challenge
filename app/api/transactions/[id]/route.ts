import { NextRequest, NextResponse } from 'next/server';
import type { TransactionInput } from '@/entities/transaction';
import { transactionService } from '@/shared/lib/transaction.factory';

type Params = { params: Promise<{ id: number }> };

export async function GET(_: NextRequest, { params }: Params) {
    try {
        const { id } = await params;
        const transaction = await transactionService.buscarPorId(Number(id));
        return NextResponse.json(transaction);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 404 });
    }
}

export async function PUT(req: NextRequest, { params }: Params) {
    try {
        const { id } = await params;
        const input: TransactionInput = await req.json();
        const transaction = await transactionService.atualizar(Number(id), input);
        return NextResponse.json(transaction);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}

export async function DELETE(_: NextRequest, { params }: Params) {
    try {
        const { id } = await params;
        await transactionService.deletar(Number(id));
        return new NextResponse(null, { status: 204 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 404 });
    }
}