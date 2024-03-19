"use client";

import React, { useState, useEffect } from "react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Input from "./components/input";

type TableData = {
  id: number;
  name: string;
  completed: boolean;
  color: string[];
};

export default function App() {
  const [todoData, setTodoData] = useState<TableData[]>([]);
  const columnHelper = createColumnHelper<TableData>();

  //@ts-ignore
  async function handleChange(data, id) {
    try {
      const response = await fetch(
        `https://65f8a8c2df151452460fdd23.mockapi.io/api/v1/todos/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        fetchData();
      } else {
        throw new Error("Failed to update the item");
      }
    } catch (error) {
      console.error("Error updating data: ", error);
    }
  }

  const columns = [
    columnHelper.accessor("id", {
      header: "ID",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => <Input data={info} />,
    }),
    columnHelper.accessor("completed", {
      header: "Completed",
      cell: (info) => (
        <input
          type="checkbox"
          className="w-6 h-10 cursor-pointer"
          checked={Boolean(info.getValue())}
          onChange={(e) =>
            handleChange({ completed: e.target.checked }, info.row.original.id)
          }
        />
      ),
    }),
    columnHelper.accessor("color", {
      header: "Color",
      cell: (info) => (
        <select
          onChange={(e) =>
            handleChange({ color: e.target.value }, info.row.original.id)
          }
          className="p-2 rounded-2xl"
          value={info.getValue()}
        >
          <option value="">Select Field</option>
          {["red", "green", "yellow", "blue"].map((column, index) => {
            return (
              <option value={column} key={index}>
                {column}
              </option>
            );
          })}
        </select>
      ),
    }),
  ];

  const table = useReactTable({
    data: todoData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://65f8a8c2df151452460fdd23.mockapi.io/api/v1/todos"
      );
      const data = await response.json();
      setTodoData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <table className="w-full border border-collapse table-auto border-slate-500">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className="p-5 bg-gray-400 border cursor-pointer text-slate-100"
                  key={header.id}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, rowIndex) => (
            <tr
              key={row.id}
              className={`${rowIndex % 2 === 0 ? "bg-gray-200" : ""}`}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-5 text-center">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
