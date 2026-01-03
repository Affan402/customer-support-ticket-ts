"use client"

import type { Ticket } from "@/lib/ticket-context"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { MoreVertical } from "lucide-react"
import { EditTicketDialog } from "@/components/edit-ticket-dialog"
import { DeleteTicketDialog } from "@/components/delete-ticket-dialog"
import { useState } from "react"

export function TicketActions({ ticket }: { ticket: Ticket }) {
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setShowEdit(true)}>Edit</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setShowDelete(true)} className="text-destructive">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditTicketDialog ticket={ticket} open={showEdit} onOpenChange={setShowEdit} />
      <DeleteTicketDialog ticket={ticket} open={showDelete} onOpenChange={setShowDelete} />
    </>
  )
}
