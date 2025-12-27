# GearGuard - Maintenance Tracker

The ultimate maintenance tracking system for equipment, machinery, and vehicles.

## Prerequisites

- [Neon](https://neon.tech) account and a PostgreSQL database.
- Node.js installed.

## Getting Started

1.  **Environment Setup**:
    Ensure you have a `.env.local` file in the root directory with your Neon connection string:
    ```env
    DATABASE_URL="postgresql://user:password@hostname/dbname?sslmode=require"
    ```

2.  **Database Initialization**:
    Run the SQL scripts provided in the `scripts/` folder in your Neon SQL console to create the necessary tables and seed initial data:
    - `001_create_tables.sql`
    - `002_seed_sample_data.sql`
    - `003_add_requester_name.sql`
    - `004_update_sample_data_indian.sql`
    - `005_create_users_table.sql`
    - `006_seed_demo_users.sql`

3.  **Install Dependencies**:
    ```bash
    npm install
    ```

4.  **Run Development Server**:
    ```bash
    npm run dev
    ```

## Project Structure

- `app/`: Next.js application routes and server actions.
- `components/`: Reusable UI components.
- `lib/`: Database connection and authentication utilities.
- `scripts/`: SQL migration and seeding scripts.
- `public/`: Static assets.

## Recent Fixes

-   **Hydration Error**: Added `suppressHydrationWarning` to `<body>` to handle browser extension interference.
-   **Database Error**: Implemented explicit check for `DATABASE_URL` in `lib/db.ts`.
