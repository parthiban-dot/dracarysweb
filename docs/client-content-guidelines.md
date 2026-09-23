# Client Content Guidelines & Permissions Checklist

This document outlines the strict guidelines for publishing commercial or delivered client work on the DRACARYS platform.

## 🛑 Privacy & Security First
As a premium student-led technology collective, we handle production-grade systems and potentially sensitive commercial IP. We must never compromise a client's trust.

### Pre-Publication Checklist

Before a project can be showcased in the `/sold-projects` or `/projects` directory, the following checks must be completed:

- [ ] **Client Approval:** Written approval from the client explicitly permitting us to feature the project in our portfolio.
- [ ] **Data Anonymization:** Ensure no real user data, PII (Personally Identifiable Information), or confidential business metrics are visible in screenshots or descriptions.
- [ ] **Architecture Sanitization:** High-level architectural diagrams are permitted, but specific infrastructure vulnerabilities, hardcoded secrets, or proprietary algorithms must NOT be disclosed.
- [ ] **Code Visibility:** If the project is commercial (`clientVisibility: PRIVATE`), the `repositoryUrl` must remain empty or point to a private internal portal. Do not link to private GitHub repositories publicly.
- [ ] **Financials:** Do not disclose contract values, payment terms, or exact revenue metrics. Stick to percentage-based performance outcomes (e.g., "Increased throughput by 40%").

### Visibility Levels

- `PUBLIC`: Full permission granted. Client name, logo, and links can be shared.
- `ANONYMIZED`: Client requested privacy. Describe the project abstractly (e.g., "Leading Fintech Startup in Europe").
- `PRIVATE`: Internal use only. Should not appear on the public showcase.

**Note:** For demo and development purposes, all placeholder data is clearly labeled as `[DEMO DATA]` and uses generic outcomes. Do NOT invent fake financial results for real clients.
