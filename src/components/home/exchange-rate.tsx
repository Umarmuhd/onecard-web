"use client";

import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { DataTable } from "./data-table.tsx";
import { formatPrice } from "@/lib/utils";

const currencyMap = new Map([
  ["USD", "$"],
  ["EUR", "€"],
  ["GBP", "£"],
  ["NGN", "₦"],
]);

type Currency = {
  _id: string;
  currency: string;
  buying: number;
  selling: number;
};

export const columns: ColumnDef<Currency>[] = [
  {
    accessorKey: "currency",
    header: "Currency",
    cell: ({ cell }) => {
      return (
        <div className="font-medium">
          {String(cell.getValue())}({currencyMap.get(String(cell.getValue()))})
        </div>
      );
    },
  },
  {
    accessorKey: "buying",
    header: "Buying",
    cell: ({ cell }) => {
      return (
        <div className="font-medium">
          {formatPrice(String(cell.getValue()), {
            currency: "NGN",
            notation: "standard",
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "selling",
    header: "Selling",
    cell: ({ cell }) => {
      return (
        <div className="font-medium">
          {formatPrice(String(cell.getValue()), {
            currency: "NGN",
            notation: "standard",
          })}
        </div>
      );
    },
  },
];

export const exchanges: Currency[] = [
  {
    _id: "728ed52f",
    currency: "USD",
    buying: 1100,
    selling: 1110,
  },
  {
    _id: "489e1d42",
    currency: "GBP",
    buying: 1200,
    selling: 1210,
  },
  {
    _id: "728ed52f",
    currency: "EUR",
    buying: 1300,
    selling: 1310,
  },
];

export default function ExchangeRate() {
  return (
    <div>
      <DataTable columns={columns} data={exchanges} />
    </div>
  );
}
