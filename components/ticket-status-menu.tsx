"use client"

import { type Ticket, useTickets } from "@/lib/ticket-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

interface TicketStatusMenuProps {
  ticket: Ticket
  onStatusChange?: () => void
}

const STATUS_ORDER: Record<Ticket["status"], Ticket["status"][]> = {
  Open: ["In Progress", "Resolved"],
  "In Progress": ["Open", "Resolved"],
  Resolved: ["Open", "In Progress"],
}

function getStatusColor(status: Ticket["status"]) {
  switch (status) {
    case "Open":
      return "bg-red-100 text-red-800 hover:bg-red-200"
    case "In Progress":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
    case "Resolved":
      return "bg-green-100 text-green-800 hover:bg-green-200"
  }
}

export function TicketStatusMenu({ ticket, onStatusChange }: TicketStatusMenuProps) {
  const { updateTicketStatus } = useTickets()
  const [loading, setLoading] = useState(false)

  const handleStatusChange = async (newStatus: Ticket["status"]) => {
    setLoading(true)
    try {
      await updateTicketStatus(ticket.id, newStatus)
      onStatusChange?.()
    } catch (err) {
      console.error("Failed to update status:", err)
    } finally {
      setLoading(false)
    }
  }

  const availableStatuses = STATUS_ORDER[ticket.status]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className={`${getStatusColor(ticket.status)} border-0`} disabled={loading}>
          {ticket.status}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {availableStatuses.map((status) => (
          <DropdownMenuItem key={status} onClick={() => handleStatusChange(status)} disabled={loading}>
            {status}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
