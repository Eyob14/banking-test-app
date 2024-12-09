import { Account } from "@prisma/client";

export type SerializedAccount = Omit<Account, "balance"> & {
    balance: number;
};