import { transactionService } from '@/shared/lib/transaction.factory';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const saldo = await transactionService.buscarSaldo();
        return NextResponse.json({ saldo });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}