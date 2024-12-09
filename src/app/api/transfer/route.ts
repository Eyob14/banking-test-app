import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/client";
import { Prisma } from "@prisma/client";
import { isValidIBAN } from "@/utils/index";

export async function POST(req: NextRequest) {
  try {
    const { sourceAccountId, recipientIban, amount } = await req.json();

    if (
      !sourceAccountId ||
      !recipientIban ||
      typeof amount !== "number" ||
      amount <= 0
    ) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // Fetch the source account (optional, if you want to verify balance, etc.)
    const sourceAccount = await prisma.account.findUnique({
      where: { id: sourceAccountId },
    });

    if (!sourceAccount) {
      return NextResponse.json(
        { error: "Source account not found" },
        { status: 404 }
      );
    }

    if (!isValidIBAN(recipientIban)) {
      return NextResponse.json(
        { error: "Invalid destination IBAN" },
        { status: 400 }
      );
    }

    if (Number(sourceAccount.balance) < amount) {
      return NextResponse.json(
        { error: "Insufficient balance" },
        { status: 400 }
      );
    }

    const result = await prisma.$transaction(async (prisma) => {
      await prisma.account.update({
        where: { id: sourceAccountId },
        data: {
          balance: new Prisma.Decimal(sourceAccount.balance).minus(amount),
        },
      });

      await prisma.transaction.create({
        data: {
          type: "TRANSFER",
          amount: amount,
          accountId: sourceAccountId,
          recipientIban: recipientIban,
        },
      });

      return { success: true };
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Transfer failed:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
