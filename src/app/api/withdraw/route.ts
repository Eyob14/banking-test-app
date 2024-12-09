import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/client';
import { Prisma } from '@prisma/client';

export async function POST(req: NextRequest) {
    try {
        const { accountId, amount } = await req.json();

        if (!accountId || typeof amount !== 'number' || amount < 10) {
            return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
        }

        const result = await prisma.$transaction(async (prisma) => {
            const account = await prisma.account.findUnique({
                where: { id: accountId },
            });

            if (!account) {
                throw new Error('Account not found');
            }

            if (Number(account.balance) < amount) {
                throw new Error('Insufficient funds');
            }

            const updatedBalance = new Prisma.Decimal(account.balance).minus(amount);

            await prisma.account.update({
                where: { id: accountId },
                data: { balance: updatedBalance },
            });

            await prisma.transaction.create({
                data: {
                    type: 'WITHDRAWAL',
                    amount: amount,
                    accountId: accountId,
                },
            });

            return { success: true };
        });

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
