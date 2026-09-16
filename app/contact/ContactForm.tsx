"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    setFieldErrors({});

    const form = event.currentTarget;
    const payload = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.ok) {
        setStatus("success");
        form.reset();
        return;
      }

      setStatus("error");
      setErrorMessage(data?.error || "Something went wrong. Please try again later.");
      setFieldErrors(data?.fieldErrors || {});
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again later.");
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className={`field${fieldErrors.name ? " invalid" : ""}`}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" autoComplete="name" required />
        {fieldErrors.name && <div className="error-text">{fieldErrors.name[0]}</div>}
      </div>

      <div className={`field${fieldErrors.email ? " invalid" : ""}`}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" autoComplete="email" required />
        {fieldErrors.email && <div className="error-text">{fieldErrors.email[0]}</div>}
      </div>

      <div className={`field${fieldErrors.message ? " invalid" : ""}`}>
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" required />
        {fieldErrors.message && <div className="error-text">{fieldErrors.message[0]}</div>}
      </div>

      <button type="submit" className="btn" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending..." : "Send message"}
      </button>

      {status === "success" && (
        <p className="form-status success" role="status" aria-live="polite">
          Thanks! Your message has been sent — check your email for a confirmation.
        </p>
      )}
      {status === "error" && (
        <p className="form-status failure" role="status" aria-live="polite">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
