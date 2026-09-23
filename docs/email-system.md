# Email & Contact System Configuration

The DRACARYS platform uses [Resend](https://resend.com) for its transactional email delivery.

## Environment Variables

To enable real email delivery in production, you must set the following environment variables in your `.env` file:

```env
# The API key from your Resend dashboard
RESEND_API_KEY="re_123456789..."

# The sender email address. Must be a domain verified in Resend.
# Example: DRACARYS <hello@dracarys.tech>
EMAIL_FROM="DRACARYS <your-verified-email@domain.com>"

# The admin email that receives notifications for new contact enquiries
ADMIN_EMAIL="admin@dracarys.local"
```

## Local Development & Testing

We have built a strict safety interceptor into `src/lib/email.ts`. 

If you are running the application locally (`NODE_ENV === "development"`) OR if you have not provided a `RESEND_API_KEY`, the system will **mock** the email delivery.

Instead of sending a real email, the email contents (To, Subject, and HTML Body) will be printed directly to your server console. This allows you to test the entire `/contact` flow, verify rate limiting, and check database insertions without burning through a third-party quota or needing actual credentials during local development.

## Security Considerations

1. **Never Expose Admin Emails:** The `ADMIN_EMAIL` is handled entirely server-side. The frontend contact form (`/contact`) simply calls a Next.js Server Action (`submitContactForm`) which reads the admin email directly from `process.env`. It is never leaked to the client.
2. **Spam Protection:** A basic in-memory rate limit is implemented in the Server Action (maximum 3 requests per minute per client). In a Vercel Serverless environment, this is stateless per function instance, but provides baseline protection. For production, consider upgrading this to Redis (Upstash) rate limiting.
