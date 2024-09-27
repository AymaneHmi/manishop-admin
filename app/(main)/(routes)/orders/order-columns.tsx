'use client';

import { useUpdateOrders } from "@/actions/get-orders";
import getStatuses from "@/actions/get-statuses";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { order } from "@/lib/types";
import { ColumnDef, Row } from "@tanstack/react-table"
import axios from "axios";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";

const endPoint = process.env.NEXT_PUBLIC_API + '/orders/order'

const StatusCell = ({row}: {row: Row<order>}) => {
  const order = row.original;
  const {statuses} = getStatuses();
  const {updateOrders} = useUpdateOrders();

  const [open, setOpen] = useState(false)

  const handleClickStatus = async (statusId: number) => {
    const resData = {
      orderId: order?.id,
      statusId,
    }
    axios.patch(endPoint, resData)
    .then(res => {
      setOpen(false)
      updateOrders();
    })
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button variant={"outline"} style={{borderColor: order?.status.value, color: order?.status.value}} className="items-center justify-between group">{order?.status.name} <span className="hidden group-hover:block"><ChevronsUpDown size={18} /></span></Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput placeholder="Search Status" />
          <CommandList>
            <CommandEmpty></CommandEmpty>
            <CommandGroup>
              {statuses?.map(status => (
                <CommandItem
                  key={status.id}
                  value={status.name}
                  onSelect={() => handleClickStatus(status.id)}
                >
                  {status.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export const columns: ColumnDef<order>[] = [
    {
      accessorKey: "orderId",
      header: "Order Id",
      cell: ({row}) => {
        const order = row.original;
        return (
          <h2 className="font-bold">{order.orderId}</h2>
        )
      }
    },
    {
      accessorKey: "orderProducts",
      header: "Products",
    },
    {
      accessorKey: "customerName",
      header: "Name",
    },
    {
      accessorKey: "customerNumber",
      header: "Number",
    },
    {
      accessorKey: "customerAddress",
      header: "Address",
    },
    {
      accessorKey: "createdAt",
      header: "Date",
    },
    {
      accessorKey: "totalPrice",
      header: "Price",
      cell: ({row}) => {
        const totalPrice = row.original.totalPrice;
        return (
          <h2>${totalPrice}</h2>
        )
      }
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: StatusCell
    },
]