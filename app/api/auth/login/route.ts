import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Mock validation
    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
    }

    // Mock successful login
    const mockUser = {
      id: "user-123",
      email,
      name: email.split("@")[0],
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
