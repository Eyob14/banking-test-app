import { WithdrawForm } from "@/components/forms/WithdrawForm";
import { getAccount } from "@/utils/common";

export default async function Withdraw() {
    const account = await getAccount("DE89370400440532013000");

    if (!account) {
        return <div>Error: Account not found</div>;
    }
    
    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-5xl pb-14 pt-5">Withdraw</h2>
            <div className="max-w-md">
                <WithdrawForm account={account} />
            </div>
        </div>
    )
}