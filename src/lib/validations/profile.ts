import { z } from "zod";

export const ProfileSchema = z.object({
  name: z.string().min(1, "Name is required").max(50),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional().or(z.literal("")),
  githubUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  linkedinUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  skills: z.string().optional(), // Comma separated string for simplicity in forms
  year: z.string().max(20).optional().or(z.literal("")),
});
