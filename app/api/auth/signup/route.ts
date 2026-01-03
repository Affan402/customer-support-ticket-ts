import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    // Mock validation
    if (!name || !email || !password) {
      return NextResponse.json({ message: "Name, email, and password are required" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ message: "Password must be at least 6 characters" }, { status: 400 })
    }

    // Mock successful signup
    const mockUser = {
      id: "user-" + Date.now(),
      email,
      name,
    }

    const mockToken = "mock-token-" + Date.now()

    return NextResponse.json({
      token: mockToken,
      user: mockUser,
    })
  } catch (error) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 })
  }
}
