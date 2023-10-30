import { Search } from "@/components/dashboard/search";
import UserNav from "@/components/dashboard/user-navigation";
import { Button } from "@/components/ui/button";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import usd from "@/assets/images/usd.svg";
import gbp from "@/assets/images/gbp.svg";
import eur from "@/assets/images/eur.svg";
import ngn from "@/assets/images/ngn.svg";

import { PlusCircleIcon } from "lucide-react";
import { Currency } from "@/types";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatPrice } from "@/lib/utils";
import ExchangeRate from "@/components/home/exchange-rate";
import { RecentTransactions } from "@/components/transactions/recent";

const WALLETS: {
  _id: string;
  name: string;
  symbol: string;
  amount: number;
  logo: string;
  currency: "NGN" | "USD" | "GBP" | "EUR";
}[] = [
  {
    _id: "123ABC",
    name: "Nigerian Naira",
    symbol: "₦",
    amount: 70000,
    logo: ngn,
    currency: "NGN",
  },
  {
    _id: "456DEF",
    name: "United States Dollar",
    currency: "USD",
    amount: 300,
    logo: usd,
    symbol: "$",
  },
  {
    _id: "789GHI",
    name: "British Pounds",
    currency: "GBP",
    amount: 280,
    logo: gbp,
    symbol: "£",
  },
  {
    _id: "012JKL",
    name: "Euro",
    symbol: "€",
    amount: 400,
    logo: eur,
    currency: "EUR",
  },
];

export default function HomePage() {
  return (
    <>
      <div className="hidden min-h-screen flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>Add money</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <span className="mr-2 font-medium">₦</span>
                      <span>Nigerian Naira</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span className="mr-2 font-medium">$</span>
                      <span>US Dollar</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span className="mr-2 font-medium">£</span>
                      <span>British Pounds</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span className="mr-2 font-medium">€</span>
                      <span>Euro</span>
                    </DropdownMenuItem>

                    {/* <DropdownMenuItem>
                      <Keyboard className="mr-2 h-4 w-4" />
                      <span>Keyboard shortcuts</span>
                      <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                    </DropdownMenuItem> */}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant={"outline-brand"}>Send money</Button>
              <Button variant={"outline-brand"}>Exchange</Button>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {WALLETS.map((wallet) => (
                  <Card key={wallet._id}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div className="flex items-center gap-2">
                        <Image
                          src={wallet.logo}
                          alt={wallet.symbol}
                          width={24}
                          height={24}
                        />
                        <CardTitle className="text-sm font-medium">
                          {wallet.name}
                        </CardTitle>
                      </div>
                      {wallet.currency === Currency.NGN && (
                        <div className="">
                          <PlusCircleIcon className="w-5 h-5 text-secondary" />
                        </div>
                      )}
                    </CardHeader>
                    <CardContent className="py-4">
                      <div className="text-2xl font-bold">
                        {formatPrice(wallet.amount, {
                          currency: wallet.currency,
                          notation: "standard",
                        })}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Exchange Rate</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <ExchangeRate />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RecentTransactions />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
