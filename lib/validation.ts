import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(200),
  email: z.string().trim().min(1, "Please enter your email.").email("Please enter a valid email address."),
  message: z.string().trim().min(1, "Please enter a message.").max(5000),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
