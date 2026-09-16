import { Resend } from "resend";
import type { ContactFormInput } from "./validation";

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set");
  }
  return new Resend(apiKey);
}

export async function sendNotificationEmail(submission: ContactFormInput) {
  const resend = getResend();
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!fromEmail || !toEmail) {
    throw new Error("CONTACT_FROM_EMAIL or CONTACT_TO_EMAIL is not set");
  }

  return resend.emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: submission.email,
    subject: `New contact form message from ${submission.name}`,
    text: `From: ${submission.name} <${submission.email}>\n\n${submission.message}`,
  });
}

export async function sendConfirmationEmail(submission: ContactFormInput) {
  const resend = getResend();
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!fromEmail) {
    throw new Error("CONTACT_FROM_EMAIL is not set");
  }

  return resend.emails.send({
    from: fromEmail,
    to: submission.email,
    subject: "We got your message — Codecraft Academy",
    text: `Hi ${submission.name},\n\nThanks for reaching out to Codecraft Academy! We received your message and someone from our team will get back to you soon.\n\nFor your records, here's what you sent us:\n\n"${submission.message}"\n\n— Codecraft Academy`,
  });
}
