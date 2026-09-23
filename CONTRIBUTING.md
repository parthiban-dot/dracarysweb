# Contributing to DRACARYS

First off, thank you for considering contributing to DRACARYS! It's people like you that make DRACARYS such a great community.

## Git Workflow

We follow a strict Git workflow to ensure stability:

- `main` — Production branch. All code here must be stable and deployable.
- `develop` — Integration branch. All features merge here for staging and testing.

### Branch Naming Conventions

- **Feature branches:** `feature/your-feature-name`
- **Bug fixes:** `fix/issue-name`
- **Hotfixes (urgent prod fixes):** `hotfix/issue-name`

### Steps to Contribute

1. Checkout the `develop` branch and pull latest changes:
   ```bash
   git checkout develop
   git pull origin develop
   ```
2. Create a new branch for your feature or fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes locally.
4. Run validation checks before committing:
   ```bash
   npm run lint
   npm run typecheck
   npm run build
   npm test
   ```
5. Commit your changes using Conventional Commits format (e.g., `feat: added contact form`).
6. Push to your branch and open a Pull Request against `develop`.

## Code Guidelines

- **TypeScript:** Use strict typing. Avoid `any` at all costs.
- **Server Components:** Default to Next.js Server Components. Only use `"use client"` when interactivity or React hooks are required.
- **Security:** Never expose environment variables or commit secrets. Validate all incoming data using Zod.
