"use client"

import { useEffect } from "react"
import { useTickets, type Ticket } from "@/lib/ticket-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TicketActions } from "@/components/ticket-actions"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { TicketStatusMenu } from "@/components/ticket-status-menu"

function getPriorityColor(priority: string) {
  switch (priority) {
    case "High":
      return "bg-red-500"
    case "Medium":
      return "bg-yellow-500"
    case "Low":
      return "bg-green-500"
    default:
      return "bg-gray-500"
  }
}

function isOverdue(createdAt: string): boolean {
  const ticketDate = new Date(createdAt)
  const now = new Date()
  const ageHours = (now.getTime() - ticketDate.getTime()) / (1000 * 60 * 60)
  return ageHours > 24
}

interface TicketListProps {
  filteredTickets?: Ticket[]
}

export function TicketList({ filteredTickets }: TicketListProps) {
  const { tickets, loading, error, fetchTickets } = useTickets()

  useEffect(() => {
    fetchTickets()
  }, [fetchTickets])

  const displayTickets = filteredTickets || tickets

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">Loading tickets...</p>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (displayTickets.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            {filteredTickets ? "No tickets match your filters." : "No tickets yet. Create one to get started!"}
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tickets ({displayTickets.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {displayTickets.map((ticket) => {
            const isOverdueTicket = isOverdue(ticket.createdAt) && ticket.status === "Open"
            return (
              <div
                key={ticket.id}
                className={`flex items-start justify-between gap-4 rounded-lg border p-4 transition-colors ${
                  isOverdueTicket ? "border-red-300 bg-red-50 dark:bg-red-950" : ""
                }`}
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{ticket.subject}</h3>
                    {isOverdueTicket && (
                      <Badge variant="destructive" className="text-xs">
                        Overdue
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{ticket.description}</p>
                  <div className="flex items-center gap-2 pt-2">
                    <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                    <TicketStatusMenu ticket={ticket} />
                    <span className="text-xs text-muted-foreground">
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <TicketActions ticket={ticket} />
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
