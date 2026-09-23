# DRACARYS 🐉

> Ancient Dragon × Modern Technology

DRACARYS is a student-led technology collective building production-grade applications, solving real problems, and competing on global stages. This repository contains the core platform source code, combining an internal CMS, member dashboard, and public showcase.

## ✨ Features

- **Project Showcase:** Dynamic routing for delivered, internal, and open-source projects.
- **Hackathon Archive:** Detailed architectural teardowns and timelines of hackathon participations.
- **Free Launchers:** Open-source utilities, templates, and boilerplates released by the collective.
- **Member Dashboard:** Authenticated portal for team members to manage profiles and view internal assignments.
- **Admin CMS:** Secure, role-based content management system for managing the entire platform.
- **Contact & Email System:** Robust rate-limited enquiry forms piped through Resend.

## 🛠 Tech Stack

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Framer Motion
- **Database:** PostgreSQL via [Prisma ORM](https://www.prisma.io/)
- **Authentication:** [Auth.js (NextAuth v5)](https://authjs.dev/)
- **Validation:** Zod
- **Testing:** Playwright (E2E) & Vitest (Unit)

## 🚀 Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/parthiban-dot/dracarysweb.git
   cd dracarysweb
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Copy the example environment file and fill in your details:
   ```bash
   cp .env.example .env
   ```

4. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma db push
   # Optional: Seed the database with demo data
   npx prisma db seed
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

## ⚙️ Environment Variables

See `.env.example` for the required keys. Never commit `.env` or `.env.local` to version control.

## 🧪 Testing

We use Vitest for unit testing and Playwright for E2E journeys.

```bash
# Run unit tests
npm run test

# Run E2E tests
npx playwright test
```

## 🏗 Architecture Overview

- `/src/app`: Next.js App Router endpoints (Public, `(auth)`, `admin`, `dashboard`).
- `/src/components`: Highly reusable UI components (`/ui`, `/layout`, `/features`, `/shared`).
- `/src/actions`: Server Actions for secure, server-side data mutations (Admin, Profile, Contact).
- `/src/lib`: Utilities, Prisma instance, Validations, and mock demo data.
- `/prisma`: Database schema and seeding scripts.

## 🚢 Deployment

Optimized for Vercel deployment. Connect the GitHub repository to Vercel, inject the environment variables, and the build pipeline (`npm run build`) will automatically execute. Ensure your PostgreSQL instance is publicly accessible to the deployment server.
