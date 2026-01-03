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

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("Authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    return NextResponse.json(mockTickets)
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch tickets" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("Authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const newTicket = {
      id: "ticket-" + Date.now(),
      ...body,
      status: "Open",
      createdAt: new Date().toISOString(),
    }

    mockTickets.unshift(newTicket)

    return NextResponse.json(newTicket)
  } catch (error) {
    return NextResponse.json({ message: "Failed to create ticket" }, { status: 500 })
  }
}
