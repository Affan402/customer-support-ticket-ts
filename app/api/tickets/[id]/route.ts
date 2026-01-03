import { type NextRequest, NextResponse } from "next/server"

// Mock database
const mockTickets: any[] = [
  {
    id: "ticket-1",
    subject: "Login page not working",
    description: "Users cannot log in to their accounts",
    category: "Technical",
    priority: "High",
    status: "Open",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "ticket-2",
    subject: "Billing issue",
    description: "Incorrect charge on my account",
    category: "Billing",
    priority: "Medium",
    status: "In Progress",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "ticket-3",
    subject: "Feature request",
    description: "Add dark mode to the dashboard",
    category: "General",
    priority: "Low",
    status: "Resolved",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
]

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const token = request.headers.get("Authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()

    const ticketIndex = mockTickets.findIndex((t) => t.id === id)
    if (ticketIndex === -1) {
      return NextResponse.json({ message: "Ticket not found" }, { status: 404 })
    }

    mockTickets[ticketIndex] = { ...mockTickets[ticketIndex], ...body }

    return NextResponse.json(mockTickets[ticketIndex])
  } catch (error) {
    return NextResponse.json({ message: "Failed to update ticket" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const token = request.headers.get("Authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const ticketIndex = mockTickets.findIndex((t) => t.id === id)

    if (ticketIndex === -1) {
      return NextResponse.json({ message: "Ticket not found" }, { status: 404 })
    }

    mockTickets.splice(ticketIndex, 1)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete ticket" }, { status: 500 })
  }
}
