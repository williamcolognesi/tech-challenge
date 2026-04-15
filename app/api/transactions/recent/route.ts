import { transactionService } from '@/shared/lib/transaction.factory';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const limit = req.nextUrl.searchParams.get('limit');
        const transactions = await transactionService.buscarUltimasTransacoes(limit ? Number(limit) : undefined);
        return NextResponse.json(transactions);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}