
import prisma from "@/lib/client";
import { SerializedAccount } from "@/utils/types";

export async function getAccount(iban: string): Promise<SerializedAccount | null> {
    const account = await prisma.account.findUnique({
        where: { iban },
    });

    if (!account) {
        return null;
    }

    return {
        id: account.id!,
        iban: account.iban || "",
        balance: Number(account.balance),
        createdAt: account.createdAt!,
        updatedAt: account.updatedAt!,
        userId: account.userId!,
    };
}
