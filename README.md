# Ticket Manager

A full-stack customer support ticket management demo built with **Next.js, TypeScript, React, and Tailwind CSS**.

I built this project to practice designing a complete ticket workflow — from authentication and API route handlers to ticket CRUD operations, filtering, status management, and a responsive dashboard.

**Live Demo:** [Open Ticket Manager](https://customer-support-ticket-ts.vercel.app/)

**Repository:** [GitHub](https://github.com/Affan402/customer-support-ticket-ts)

> **Note:** This is a portfolio/demo project. Authentication and ticket storage are mocked and data is kept in memory. It is not intended for production use.

---

## Features

- 🎫 Create, edit, delete, and manage support tickets
- 🔄 Update tickets through `Open`, `In Progress`, and `Resolved` states
- 🔍 Search tickets by subject or description
- 🎯 Filter by priority and status
- 📊 Dashboard statistics for total, open, in-progress, and resolved tickets
- ⏰ Flag open tickets older than 24 hours as overdue
- 📥 Export the current filtered ticket list as CSV
- 🌙 Light and dark themes
- 📱 Responsive interface
- 📈 Vercel Analytics

---

## Tech Stack

| Area       | Technology                    |
|------------|-------------------------------|
| Framework  | Next.js 16 (App Router)       |
| Language   | TypeScript                    |
| UI         | React 19                      |
| Styling    | Tailwind CSS v4               |
| Components | shadcn/ui                     |
| Icons      | Lucide                        |
| State      | React Context                 |
| Validation | Custom client-side validation |
| Analytics  | Vercel Analytics              |

---

## Running Locally

### Requirements

- Node.js `20.9+`
- pnpm recommended (npm also works)

### Installation

```bash
git clone https://github.com/Affan402/customer-support-ticket-ts.git
cd customer-support-ticket-ts

pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000/).

No environment variables are required.

### Demo Authentication

Authentication is mocked for demonstration purposes. You can create an account using any name and email with a password of at least 6 characters.

---

## How It Works

The application is split into three main areas:

**Frontend**

The UI is built with React and reusable shadcn/ui components. Ticket filtering and dashboard state are handled on the client.

**State Management**

React Context is used for authentication and ticket state. The ticket context handles fetching, creating, updating, and deleting tickets.

**API Layer**

Next.js Route Handlers provide endpoints for authentication and ticket operations.

```text
Browser
   │
   ▼
React / Next.js UI
   │
   ├── Auth Context
   └── Ticket Context
          │
          ▼
   Next.js API Routes
          │
          ▼
   In-memory mock data
```

---

## Project Structure

```
app/
├── api/
│   ├── auth/
│   └── tickets/
├── dashboard/
├── login/
├── signup/
└── page.tsx

components/
├── ui/
└── ticket components

lib/
├── auth-context.tsx
├── ticket-context.tsx
└── utils.ts
```

---

## API Endpoints

### Authentication

| Method | Endpoint           | Description              |
|--------|--------------------|--------------------------|
| `POST` | `/api/auth/signup` | Create a mock account    |
| `POST` | `/api/auth/login`  | Return a mock auth token |

### Tickets

| Method   | Endpoint           | Description     |
|----------|--------------------|-----------------|
| `GET`    | `/api/tickets`     | Fetch tickets   |
| `POST`   | `/api/tickets`     | Create a ticket |
| `PATCH`  | `/api/tickets/:id` | Update a ticket |
| `DELETE` | `/api/tickets/:id` | Delete a ticket |

### Ticket Model

```ts
interface Ticket {
  id: string
  subject: string
  description: string
  category: "Technical" | "Billing" | "General"
  priority: "Low" | "Medium" | "High"
  status: "Open" | "In Progress" | "Resolved"
  createdAt: string
}
```

---

## Important Limitations

This project intentionally uses a mocked backend, so it should not be considered production-ready.

### Authentication

- No real user database
- No password hashing
- Tokens are mock values
- Authentication state is stored in `localStorage`
- API routes only verify that a Bearer token exists

### Data Storage

Tickets are stored in an in-memory JavaScript array.

This means:

- Data is lost when the server restarts
- Data is not persistent
- Tickets are not truly isolated between users
- Serverless deployments may have different in-memory instances

## What I Would Add for Production

A production version would replace the mocked backend with:

- PostgreSQL or another persistent database
- Prisma or Drizzle ORM
- Secure server-side sessions
- Proper authentication and authorization
- User-specific ticket ownership
- Server-side validation
- Rate limiting
- Automated tests

---

## Deployment

The application is configured for deployment on Vercel.

Before deploying, verify the production build locally:

```bash
pnpm build
pnpm start
```# Ticket Manager

A full-stack customer support ticket management demo built with **Next.js, TypeScript, React, and Tailwind CSS**.

I built this project to practice designing a complete ticket workflow — from authentication and API route handlers to ticket CRUD operations, filtering, status management, and a responsive dashboard.

**Live Demo:** [Open Ticket Manager](https://customer-support-ticket-ts.vercel.app/)

**Repository:** [GitHub](https://github.com/Affan402/customer-support-ticket-ts)

> **Note:** This is a portfolio/demo project. Authentication and ticket storage are mocked and data is kept in memory. It is not intended for production use.

---

## Features

- 🎫 Create, edit, delete, and manage support tickets
- 🔄 Update tickets through `Open`, `In Progress`, and `Resolved` states
- 🔍 Search tickets by subject or description
- 🎯 Filter by priority and status
- 📊 Dashboard statistics for total, open, in-progress, and resolved tickets
- ⏰ Flag open tickets older than 24 hours as overdue
- 📥 Export the current filtered ticket list as CSV
- 🌙 Light and dark themes
- 📱 Responsive interface
- 📈 Vercel Analytics

---

## Tech Stack

| Area       | Technology                    |
|------------|-------------------------------|
| Framework  | Next.js 16 (App Router)       |
| Language   | TypeScript                    |
| UI         | React 19                      |
| Styling    | Tailwind CSS v4               |
| Components | shadcn/ui                     |
| Icons      | Lucide                        |
| State      | React Context                 |
| Validation | Custom client-side validation |
| Analytics  | Vercel Analytics              |

---

## Running Locally

### Requirements

- Node.js `20.9+`
- pnpm recommended (npm also works)

### Installation

```bash
git clone https://github.com/Affan402/customer-support-ticket-ts.git
cd customer-support-ticket-ts

pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000/).

No environment variables are required.

### Demo Authentication

Authentication is mocked for demonstration purposes. You can create an account using any name and email with a password of at least 6 characters.

---

## How It Works

The application is split into three main areas:

**Frontend**

The UI is built with React and reusable shadcn/ui components. Ticket filtering and dashboard state are handled on the client.

**State Management**

React Context is used for authentication and ticket state. The ticket context handles fetching, creating, updating, and deleting tickets.

**API Layer**

Next.js Route Handlers provide endpoints for authentication and ticket operations.

```text
Browser
   │
   ▼
React / Next.js UI
   │
   ├── Auth Context
   └── Ticket Context
          │
          ▼
   Next.js API Routes
          │
          ▼
   In-memory mock data
```

---

## Project Structure

```
app/
├── api/
│   ├── auth/
│   └── tickets/
├── dashboard/
├── login/
├── signup/
└── page.tsx

components/
├── ui/
└── ticket components

lib/
├── auth-context.tsx
├── ticket-context.tsx
└── utils.ts
```

---

## API Endpoints

### Authentication

| Method | Endpoint           | Description              |
|--------|--------------------|--------------------------|
| `POST` | `/api/auth/signup` | Create a mock account    |
| `POST` | `/api/auth/login`  | Return a mock auth token |

### Tickets

| Method   | Endpoint           | Description     |
|----------|--------------------|-----------------|
| `GET`    | `/api/tickets`     | Fetch tickets   |
| `POST`   | `/api/tickets`     | Create a ticket |
| `PATCH`  | `/api/tickets/:id` | Update a ticket |
| `DELETE` | `/api/tickets/:id` | Delete a ticket |

### Ticket Model

```ts
interface Ticket {
  id: string
  subject: string
  description: string
  category: "Technical" | "Billing" | "General"
  priority: "Low" | "Medium" | "High"
  status: "Open" | "In Progress" | "Resolved"
  createdAt: string
}
```

---

## Important Limitations

This project intentionally uses a mocked backend, so it should not be considered production-ready.

### Authentication

- No real user database
- No password hashing
- Tokens are mock values
- Authentication state is stored in `localStorage`
- API routes only verify that a Bearer token exists

### Data Storage

Tickets are stored in an in-memory JavaScript array.

This means:

- Data is lost when the server restarts
- Data is not persistent
- Tickets are not truly isolated between users
- Serverless deployments may have different in-memory instances

## What I Would Add for Production

A production version would replace the mocked backend with:

- PostgreSQL or another persistent database
- Prisma or Drizzle ORM
- Secure server-side sessions
- Proper authentication and authorization
- User-specific ticket ownership
- Server-side validation
- Rate limiting
- Automated tests

---

## Deployment

The application is configured for deployment on Vercel.

Before deploying, verify the production build locally:

```bash
pnpm build
pnpm start
```
