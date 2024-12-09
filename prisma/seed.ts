import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { TransactionType } from "@prisma/client";

async function main() {
  // Create Users
  const user1 = await prisma.user.create({
    data: {
      name: "Alice Johnson",
      email: "alice@example.com",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Bob Smith",
      email: "bob@example.com",
    },
  });

  // Create Accounts
  const account1 = await prisma.account.create({
    data: {
      iban: "DE89370400440532013000",
      balance: 5000.0,
      userId: user1.id,
    },
  });

  const account2 = await prisma.account.create({
    data: {
      iban: "FR7630006000011234567890189",
      balance: 3000.0,
      userId: user2.id,
    },
  });

  // Add Transactions
  await prisma.transaction.createMany({
    data: [
      // Deposits for account1
      { type: TransactionType.DEPOSIT, amount: 1000.0, accountId: account1.id },
      { type: TransactionType.DEPOSIT, amount: 200.0, accountId: account1.id },

      // Withdrawals for account1
      {
        type: TransactionType.WITHDRAWAL,
        amount: 500.0,
        accountId: account1.id,
      },

      // Transfers from account1 to account2
      {
        type: TransactionType.TRANSFER,
        amount: 1000.0,
        accountId: account1.id,
        recipientIban: account2.iban,
      },

      // Deposits for account2
      { type: TransactionType.DEPOSIT, amount: 500.0, accountId: account2.id },

      // Withdrawals for account2
      {
        type: TransactionType.WITHDRAWAL,
        amount: 300.0,
        accountId: account2.id,
      },
    ],
  });

  console.log("Seed data created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
