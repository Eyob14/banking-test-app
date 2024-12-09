import { TransferForm } from "@/components/forms/TransformForm";
import { getAccount } from "@/utils/common";

export default async function Transfer() {
    const account = await getAccount("DE89370400440532013000");

    if (!account) {
        return <div>Error: Account not found</div>;
    }
    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-5xl pb-14 pt-5">Transfer</h2>
            <div className="max-w-md">
                <TransferForm account={account} />
            </div>
        </div>
    )
}