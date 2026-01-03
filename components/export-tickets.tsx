"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import type { Ticket } from "@/lib/ticket-context"

interface ExportTicketsProps {
  tickets: Ticket[]
}

export function ExportTickets({ tickets }: ExportTicketsProps) {
  const exportAsCSV = () => {
    const headers = ["ID", "Subject", "Description", "Category", "Priority", "Status", "Created Date"]
    const rows = tickets.map((ticket) => [
      ticket.id,
      ticket.subject,
      ticket.description,
      ticket.category,
      ticket.priority,
      ticket.status,
      new Date(ticket.createdAt).toLocaleDateString(),
    ])

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)

    link.setAttribute("href", url)
    link.setAttribute("download", `tickets-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Button variant="outline" size="sm" onClick={exportAsCSV} disabled={tickets.length === 0}>
      <Download className="mr-2 h-4 w-4" />
      Export CSV
    </Button>
  )
}
