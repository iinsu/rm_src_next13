import { promises as fs } from "fs";
import path from "path";
import { Metadata } from "next";
import Image from "next/image";
import { z } from "zod";

import { columns } from "./components/columns";
import { taskSchema } from "./data/schema";
import { UserNav } from "./components/user-nav";
import { DataTable } from "./components/data-table";

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build useing Tanstack Table.",
};

const getTask = async () => {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/app/table/data/tasks.json")
  );

  const tasks = JSON.parse(data.toString());
  return z.array(taskSchema).parse(tasks);
};

const TablePage = async () => {
  const tasks = await getTask();

  return (
    <>
      <div className="flex-col flex-1 hidden h-full p-8 space-y-8 md:flex">
        <div className="flex items-center justify-between space-y-2 ">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div>
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  );
};

export default TablePage;
