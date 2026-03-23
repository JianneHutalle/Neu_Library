# NEU Library System

## Overview

A full-stack library kiosk management system for New Era University. Students can log in and select their reason for visiting. Admins can monitor live visitors, manage records, and view statistics.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Frontend**: React + Vite + Tailwind CSS + shadcn/ui
- **Charts**: Recharts (admin dashboard)
- **Build**: esbuild

## User Flow

### Student Flow
1. **Landing** (`/`) — Select Student or Admin
2. **Student Login** (`/student-login`) — Enter username + program
3. **Visit Reason** (`/visit-reason`) — Select Study, Research, Printing, Internet Use, or Group Study
4. **Welcome** (`/welcome`) — Success screen, auto-redirects to landing after 5s

### Admin Flow
1. **Landing** (`/`) — Select Admin
2. **Admin Login** (`/admin-login`) — Enter credentials (default: `admin` / `admin123`)
3. **Dashboard** (`/admin`) — Live stats (daily/weekly/monthly visitors) + chart
4. **Visitor Management** (`/admin/visitors`) — Real-time table with Block/Unblock and Time Out actions
5. **Records** (`/admin/records`) — Full historical records with CSV download

## Structure

```text
artifacts-monorepo/
├── artifacts/
│   ├── api-server/       # Express API server
│   └── web-app/          # React + Vite frontend
├── lib/
│   ├── api-spec/         # OpenAPI spec + Orval codegen config
│   ├── api-client-react/ # Generated React Query hooks
│   ├── api-zod/          # Generated Zod schemas
│   └── db/               # Drizzle ORM (visitors table)
└── scripts/
```

## API Endpoints

- `GET /api/healthz` — Health check
- `POST /api/auth/student` — Student login (registers visit)
- `POST /api/auth/admin` — Admin login (default: admin/admin123)
- `GET /api/visitors` — List active visitors (with optional search)
- `POST /api/visitors` — Register a visitor (time in)
- `PATCH /api/visitors/:id/block` — Block or unblock visitor
- `PATCH /api/visitors/:id/timeout` — Time out visitor
- `GET /api/records` — All historical records
- `GET /api/stats` — Daily/weekly/monthly stats
- `GET /api/stats/chart` — Chart data for date range

## Database

- `visitors` table: id, name, program, reason, status (time_in/time_out/blocked), time_in, time_out, created_at

## Theme Colors

- Navy: `#003366` (primary/sidebar)
- Blue: `#2b5a8e` (secondary/buttons)
- Light bg: `#f4f7f9` (admin pages)
- Dark kiosk: radial gradient `#1b365d → #040a16` (login pages)
