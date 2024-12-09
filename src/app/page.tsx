import Image from "next/image"
import { ChevronRight } from 'lucide-react';
import prisma from "@/lib/client";
import { format } from 'date-fns';
export default async function home() {
  const account = await prisma.account.findUnique({
    where: { iban: "DE89370400440532013000" },
  });
  if (!account) {
    return <div>Error: Account not found</div>;
  }
  const transactions = await prisma.transaction.findMany({
    where: { accountId: account.id },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="w-full flex flex-col justify-center">
      <h2 className="text-5xl pb-14 pt-5">Home</h2>
      <h4 className="text-2xl py-2">Balances</h4>
      <p className="text-l">{`Total fund in balance: ${account?.balance} USD`}</p>
      <div className="flex w-64 h-28 items-center justify-between border rounded-3xl gap-3 py-5 px-3 mt-7">
        <Image
          src="/flag.webp"
          width={60}
          height={60}
          alt="american-flag"
          className="rounded-full"
        />
        <h4>{`${account?.balance} USD`}</h4>
        <ChevronRight />
      </div>
      <div className="py-6 mt-3">
        <h4 className="text-2xl py-4">Transactions</h4>
        <div className="border w-full flex flex-col gap-3">
          <ul className="">
            {
              transactions.map((transaction) => (
                <li key={transaction.id} className="flex flex-col justify-between gap-2 sm:flex-row  border border-1 py-3 px-3">
                  <span className="">{format(new Date(transaction.createdAt), "d MMM yyyy")}</span>
                  <span className="">{transaction.type}</span>
                  <span className="">{transaction.amount.toString()} USD</span>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  )
}