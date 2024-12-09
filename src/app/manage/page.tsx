"use client"

import { useRouter } from "next/navigation"

export default function Manage() {
    const router = useRouter();

    return (
        <div className="w-full flex flex-col justify-center">
            <h1 className="text-4xl pb-14 pt-5">Manage</h1>
            <div className="flex flex-col sm:flex-row sm:gap-10 gap-4">
                <div className="flex flex-col sm:flex-row gap-3 cursor-pointer hover:bg-slate-50 hover:rounded-lg"
                    onClick={() => router.push("/deposit")}
                >
                    <div className="h-20 cursor-pointer border rounded-xl flex justify-center items-center px-8">
                        <h4 className="text-2xl">Deposit</h4>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 cursor-pointer hover:bg-slate-50 hover:rounded-lg"
                    onClick={() => router.push("/withdraw")}
                >
                    <div className="h-20 cursor-pointer border rounded-xl flex justify-center items-center px-8">
                        <h4 className="text-2xl">Withdraw</h4>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 cursor-pointer hover:bg-slate-50 hover:rounded-lg"
                    onClick={() => router.push("/transfer")}
                >
                    <div className="h-20 cursor-pointer border rounded-xl flex justify-center items-center px-8">
                        <h4 className="text-2xl">Transfer</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}