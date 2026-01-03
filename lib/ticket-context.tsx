"use client"

import { createContext, useContext, useState, type ReactNode, useCallback } from "react"

export interface Ticket {
  id: string
  subject: string
  description: string
  category: "Technical" | "Billing" | "General"
  priority: "Low" | "Medium" | "High"
  status: "Open" | "In Progress" | "Resolved"
  createdAt: string
}

export interface TicketContextType {
  tickets: Ticket[]
  loading: boolean
  error: string | null
  fetchTickets: () => Promise<void>
  createTicket: (ticket: Omit<Ticket, "id" | "createdAt" | "status">) => Promise<void>
  updateTicket: (id: string, updates: Partial<Ticket>) => Promise<void>
  deleteTicket: (id: string) => Promise<void>
  updateTicketStatus: (id: string, status: Ticket["status"]) => Promise<void>
}

const TicketContext = createContext<TicketContextType | undefined>(undefined)

export function TicketProvider({ children }: { children: ReactNode }) {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTickets = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/tickets", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })

      if (!response.ok) throw new Error("Failed to fetch tickets")
      const data = await response.json()
      setTickets(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch tickets"
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [])

  const createTicket = async (ticket: Omit<Ticket, "id" | "createdAt" | "status">) => {
    try {
      const response = await fetch("/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(ticket),
      })

      if (!response.ok) throw new Error("Failed to create ticket")
      const newTicket = await response.json()
      setTickets([newTicket, ...tickets])
    } catch (err) {
      throw err
    }
  }

  const updateTicket = async (id: string, updates: Partial<Ticket>) => {
    try {
      const response = await fetch(`/api/tickets/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(updates),
      })

      if (!response.ok) throw new Error("Failed to update ticket")
      const updated = await response.json()
      setTickets(tickets.map((t) => (t.id === id ? updated : t)))
    } catch (err) {
      throw err
    }
  }

  const deleteTicket = async (id: string) => {
    try {
      const response = await fetch(`/api/tickets/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })

      if (!response.ok) throw new Error("Failed to delete ticket")
      setTickets(tickets.filter((t) => t.id !== id))
    } catch (err) {
      throw err
    }
  }

  const updateTicketStatus = async (id: string, status: Ticket["status"]) => {
    await updateTicket(id, { status })
  }

  return (
    <TicketContext.Provider
      value={{
        tickets,
        loading,
        error,
        fetchTickets,
        createTicket,
        updateTicket,
        deleteTicket,
        updateTicketStatus,
      }}
    >
      {children}
    </TicketContext.Provider>
  )
}

export function useTickets() {
  const context = useContext(TicketContext)
  if (context === undefined) {
    throw new Error("useTickets must be used within TicketProvider")
  }
  return context
}
