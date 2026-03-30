# 📊 MongoDB E-Commerce Dashboard

A Next.js analytics dashboard for MongoDB data visualization and reporting. Includes interactive charts, KPI cards, and seed scripts for demo data.

## Features

- Visualize sales, orders, users, and product data
- Interactive charts (bar, line, pie, radar, treemap)
- KPI summary cards
- Seed scripts for demo data
- REST API endpoints for data access
- Built with Next.js App Router, TypeScript, Tailwind CSS

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** MongoDB

## Prerequisites

- **Node.js** v18 or higher
- **MongoDB** (local or remote)
- You must create a database called `mongo-analytics` in your MongoDB instance before running the app.

## Quick Start

### 1. Clone the repo

```bash
git clone https://github.com/your-username/mongo-recharty.git
cd mongo-recharty
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

Copy `.env.example` to `.env` and fill in your MongoDB connection string:

```bash
cp .env.example .env
```

Edit `.env`:

```
MONGODB_URI=mongodb://localhost:27017/mongo-analytics
```

### 4. Run the app

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

For production build:

```bash
pnpm build
pnpm start
```

## Project Structure

```
mongo-recharty/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── api/
│       └── ...
├── components/
│   └── visualisation/
├── lib/
│   └── mongodb/
├── public/
├── .gitignore
├── .env.example
├── package.json
├── tsconfig.json
└── next.config.ts
```

## License

ISC
