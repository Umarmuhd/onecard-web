"use client";

import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { formatPrice } from "@/lib/utils";
import { DataTable } from "@/components/data-table";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

const currencyMap = new Map([
  ["USD", "$"],
  ["EUR", "€"],
  ["GBP", "£"],
  ["NGN", "₦"],
]);

type Transaction = {
  _id: string;
  tendered: number;
  description: string;
  purpose: string;
  trxn_type: "credit" | "debit";
  currency: "USD" | "EUR" | "GBP" | "NGN";
};

export const transactions: Transaction[] = [
  {
    _id: "728ed52f",
    tendered: 1000,
    purpose: "Swap",
    description: "USD - NGN",
    trxn_type: "credit",
    currency: "USD",
  },
  {
    _id: "728ed23",
    tendered: 10000,
    purpose: "Withdraw",
    description: "To Bank Account",
    trxn_type: "debit",
    currency: "NGN",
  },
];

export function RecentTransactions() {
  return (
    <div>
      <div className="space-y-8">
        {transactions.map((trxn) => (
          <div key={trxn._id} className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarFallback>
                {trxn.trxn_type === "debit" ? (
                  <ArrowUpIcon className="text-red-600" />
                ) : (
                  <ArrowDownIcon className="text-green-600" />
                )}
              </AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{trxn.purpose}</p>
              <p className="text-sm text-muted-foreground">
                {trxn.description}
              </p>
            </div>
            <div className="ml-auto font-medium">
              {formatPrice(trxn.tendered, {
                currency: trxn.currency,
                notation: "standard",
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
