"use server";

import { z } from "zod";
import { ContactSchema } from "@/lib/validations/contact";
import { db } from "@/lib/db";
import { sendEmail } from "@/lib/email";

// Simple in-memory rate limiting (for demo/Vercel serverless it resets, but it's a basic defense)
const rateLimitMap = new Map<string, { count: number, timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 3;

export async function submitContactForm(values: z.infer<typeof ContactSchema>, ip: string = "unknown") {
  // 1. Rate Limiting Check
  const now = Date.now();
  const rateLimitState = rateLimitMap.get(ip) || { count: 0, timestamp: now };
  
  if (now - rateLimitState.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitState.count = 1;
    rateLimitState.timestamp = now;
  } else {
    rateLimitState.count++;
  }
  rateLimitMap.set(ip, rateLimitState);

  if (rateLimitState.count > MAX_REQUESTS) {
    return { error: "Too many requests. Please try again later." };
  }

  // 2. Validation
  const validatedFields = ContactSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid form data provided." };
  }

  const { name, email, organization, category, message } = validatedFields.data;

  try {
    // 3. Save to Database
    try {
      await db.contactSubmission.create({
        data: { name, email, company: organization || null, status: "NEW", message: `[${category}] ${message}` }
      });
    } catch {
      console.warn("Database save failed (possibly disconnected), continuing to email.");
    }

    // 4. Send Emails
    // Admin Notification
    const adminEmail = process.env.ADMIN_EMAIL || "admin@dracarys.local";
    await sendEmail({
      to: adminEmail,
      subject: `[DRACARYS] New ${category} Enquiry from ${name}`,
      html: `
        <h2>New Enquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Organization:</strong> ${organization || "N/A"}</p>
        <p><strong>Category:</strong> ${category}</p>
        <hr />
        <p>${message}</p>
      `
    });

    // Sender Confirmation
    await sendEmail({
      to: email,
      subject: `Thank you for contacting DRACARYS`,
      html: `
        <h2>Message Received</h2>
        <p>Hi ${name},</p>
        <p>Thank you for reaching out to the DRACARYS collective. We have received your ${category.toLowerCase()} enquiry and our team will review it shortly.</p>
        <p>Best,<br/>The DRACARYS Team</p>
      `
    });

    return { success: "Your message has been sent successfully. We will be in touch soon!" };
  } catch {
    return { error: "Failed to process your request. Please try again later." };
  }
}
