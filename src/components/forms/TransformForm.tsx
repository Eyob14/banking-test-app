"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SerializedAccount } from "@/utils/types"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

interface IDepositFormProps {
    account: SerializedAccount | null;
}

const formSchema = z.object({
    amount: z.preprocess((value) => parseFloat(value as string), z.number().min(10)),
    recipientIban: z.string(),
});

export function TransferForm({ account }: IDepositFormProps) {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            amount: 10,
            recipientIban: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await fetch("/api/transfer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    sourceAccountId: account?.id,
                    amount: values.amount,
                    recipientIban: values.recipientIban,
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || "Failed to deposit");
            }
            router.push("/")
            toast("Transfer successful!")
        } catch (error) {
            console.log(error)
            toast.error("Please check recipient IBAN number and try again.");
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                                <Input placeholder="Amount" {...field} />
                            </FormControl>
                            <FormDescription>
                                Enter amount greater than 10 USD.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="recipientIban"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Recipient Iban Number</FormLabel>
                            <FormControl>
                                <Input placeholder="Recipient Iban Number" {...field} />
                            </FormControl>
                            <FormDescription>
                                Enter correct Recipient Iban Number.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
