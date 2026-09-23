# Architecture

## Core Principles
1. **Server-First:** We leverage Next.js App Router Server Components and Server Actions as much as possible to reduce client-side bundle size and improve performance.
2. **Monolithic:** The backend lives within Next.js. We avoid creating a separate backend service unless specifically required for long-running AI tasks.
3. **Type Safety:** Strict TypeScript everywhere. Prisma types are shared with the frontend.
4. **Validation:** Zod is used for all boundary validations (forms, API routes, Server Actions).

## Folder Structure
- `src/app`: Routes and pages.
- `src/components`: UI components.
  - `ui`: shadcn/ui generic components.
  - `layout`: Structural components (Navbar, Footer).
  - `shared`: Reusable project-specific components.
- `src/lib`: Utilities.
- `src/server`: Server-only logic (Actions, DB).
- `src/schemas`: Zod validation schemas.
