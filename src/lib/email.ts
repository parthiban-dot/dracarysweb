import { Resend } from "resend";
import nodemailer from "nodemailer";

const resend = new Resend(process.env.RESEND_API_KEY || "mock-key");

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailPayload) {
  if (process.env.NODE_ENV === "development" && !process.env.RESEND_API_KEY && !process.env.EMAIL_PASS) {
    console.log("==========================================");
    console.log("🚀 MOCK EMAIL INTERCEPTED");
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log("Body:");
    console.log(html);
    console.log("==========================================");
    return { success: true, mock: true };
  }

  try {
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const info = await transporter.sendMail({
        from: `"DRACARYS" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
      });
      return { success: true, data: info };
    }

    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM || "onboarding@resend.dev",
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
