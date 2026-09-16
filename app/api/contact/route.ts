import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactSubmissions } from "@/lib/schema";
import { contactFormSchema } from "@/lib/validation";
import { sendConfirmationEmail, sendNotificationEmail } from "@/lib/email";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please fix the highlighted fields.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const submission = parsed.data;

  try {
    await db.insert(contactSubmissions).values(submission);
  } catch (err) {
    console.error("Failed to save contact submission:", err);
    return NextResponse.json(
      { ok: false, error: "We couldn't save your message. Please try again later." },
      { status: 500 }
    );
  }

  const [notificationResult, confirmationResult] = await Promise.allSettled([
    sendNotificationEmail(submission),
    sendConfirmationEmail(submission),
  ]);

  if (notificationResult.status === "rejected") {
    console.error("Failed to send notification email:", notificationResult.reason);
  }
  if (confirmationResult.status === "rejected") {
    console.error("Failed to send confirmation email:", confirmationResult.reason);
  }

  if (notificationResult.status === "rejected" && confirmationResult.status === "rejected") {
    return NextResponse.json(
      { ok: false, error: "Your message was saved, but we couldn't send email confirmation." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
