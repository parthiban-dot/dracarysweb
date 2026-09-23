import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "mock-key");

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailPayload) {
  // Mock email in development or if API key is missing
  if (process.env.NODE_ENV === "development" || !process.env.RESEND_API_KEY) {
    console.log("==========================================");
    console.log("📨 MOCK EMAIL INTERCEPTED");
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log("Body:");
    console.log(html);
    console.log("==========================================");
    return { success: true, mock: true };
  }

  try {
    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM || "DRACARYS <hello@dracarys.tech>",
      to,
      subject,
      html,
    });
    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { error: "Email delivery failed" };
  }
}
