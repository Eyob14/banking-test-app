import { TransferForm } from "@/components/forms/TransformForm";
import prisma from "@/lib/client";
import { SerializedAccount } from "@/utils/types";

export default async function Transfer() {
    const account = await prisma.account.findUnique({
        where: { iban: "DE89370400440532013000" },
    });
    if (!account) {
        return <div>Error: Account not found</div>;
    }
    const serializedAccount: SerializedAccount = {
        id: account.id!,
        iban: account.iban || "",
        balance: Number(account.balance),
        createdAt: account.createdAt!,
        updatedAt: account.updatedAt!,
        userId: account.userId!,
    };
    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-5xl pb-14 pt-5">Transfer</h2>
            <div className="max-w-md">
                <TransferForm account={serializedAccount} />
            </div>
        </div>
    )
}