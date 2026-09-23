# Security Policy

## Supported Versions

Currently, only the latest version on the `main` branch is supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| Next    | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability within DRACARYS, please send an e-mail to the core administrative team. All security vulnerabilities will be promptly addressed.

**DO NOT** publicly disclose the vulnerability via a GitHub issue or social media until we have had the opportunity to patch it and release an update.

### Security Best Practices Implemented

- **No Secrets in Code:** `DATABASE_URL`, `AUTH_SECRET`, and `RESEND_API_KEY` must always reside in `.env`.
- **Validation:** All incoming data is parsed securely via `zod`.
- **Authorization:** Handled via Next.js Edge Middleware and strict Server Action verification (`verifyAdmin()`).
