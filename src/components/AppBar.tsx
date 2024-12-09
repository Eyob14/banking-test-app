
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import prisma from "@/lib/client";
import { getInitials } from "@/utils";

export async function AppBar() {
    const user = await prisma.user.findFirst();
    const account = await prisma.account.findFirst();
    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className="w-full flex justify-end px-4 pt-3">
                    <div className="flex justify-center items-center gap-1 py-3 px-3 cursor-pointer hover:bg-slate-50 hover:rounded-lg"
                    >
                        <div className="flex items-center justify-center border rounded-full w-10 h-10 bg-blue-400">
                            {getInitials(user?.name || "")}
                        </div>
                        <Separator orientation="vertical" />
                        <p>{`${user?.name}`}</p>
                    </div>
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-72" align="end">
                <div className="flex flex-col gap-1 pt-3 px-2">
                    <p className="text-lg font-bold">{`${user?.name}`}</p>
                    <p className="text-base">Customer ID: <span className="font-extralight">{`${user?.id}`}</span></p>
                    <p className="font-light">IBAN: <span className="font-extralight">{`${account?.iban}`}</span></p>
                </div>
            </PopoverContent>
        </Popover>

    )
}