"use client"

import { useState, useMemo } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { DashboardHeader } from "@/components/dashboard-header"
import { TicketStatistics } from "@/components/ticket-statistics"
import { TicketList } from "@/components/ticket-list"
import { CreateTicketDialog } from "@/components/create-ticket-dialog"
import { TicketFilters } from "@/components/ticket-filters"
import { DarkModeToggle } from "@/components/dark-mode-toggle"
import { ExportTickets } from "@/components/export-tickets"
import { useTickets, type Ticket } from "@/lib/ticket-context"
import { useEffect } from "react"

export default function DashboardPage() {
  const { tickets, fetchTickets } = useTickets()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPriority, setSelectedPriority] = useState<Ticket["priority"] | "All">("All")
  const [selectedStatus, setSelectedStatus] = useState<Ticket["status"] | "All">("All")

  useEffect(() => {
    fetchTickets()
  }, [fetchTickets])

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const matchesSearch =
        searchQuery === "" ||
        ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesPriority = selectedPriority === "All" || ticket.priority === selectedPriority
      const matchesStatus = selectedStatus === "All" || ticket.status === selectedStatus

      return matchesSearch && matchesPriority && matchesStatus
    })
  }, [tickets, searchQuery, selectedPriority, selectedStatus])

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-between border-b bg-card px-6 py-4">
          <div>
            <DashboardHeader />
          </div>
          <DarkModeToggle />
        </div>
        <main className="space-y-6 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Dashboard</h2>
            <div className="flex gap-2">
              <ExportTickets tickets={filteredTickets} />
              <CreateTicketDialog />
            </div>
          </div>
          <TicketStatistics />
          <TicketFilters
            searchQuery={searchQuery}
            onSearch={setSearchQuery}
            selectedPriority={selectedPriority}
            onPriorityFilter={setSelectedPriority}
            selectedStatus={selectedStatus}
            onStatusFilter={setSelectedStatus}
          />
          <TicketList filteredTickets={filteredTickets} />
        </main>
      </div>
    </ProtectedRoute>
  )
}
