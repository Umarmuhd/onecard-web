import UserNav from "@/components/dashboard/user-navigation";
import { DataTable } from "@/components/data-table";
import React from "react";

import { promises as fs } from "fs";
import path from "path";
import { Metadata } from "next";
import Image from "next/image";
import { z } from "zod";

import { columns } from "@/components/cards/column";
import { Button } from "@/components/ui/button";
import { Task } from "@/components/cards/data/schema";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IssueCardForm } from "@/components/cards/issue-card-form";

export const metadata: Metadata = {
  title: "Cards",
  description: "Cards page",
};

// // Simulate a database read for tasks.
// async function getTasks() {
//   const data = await fs.readFile(
//     path.join(process.cwd(), "app/examples/tasks/data/tasks.json")
//   )

//   const tasks = JSON.parse(data.toString())

//   return z.array(taskSchema).parse(tasks)
// }

export default async function CardsPage() {
  // const tasks = await getTasks();
  const tasks: Task[] = [];

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex min-h-screen">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Cards</h2>
          </div>
          <div className="">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={"default"}>New Card +</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Issue new card</DialogTitle>
                  <DialogDescription>
                    Assign card to customers
                  </DialogDescription>
                </DialogHeader>
                <IssueCardForm />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  );
}
