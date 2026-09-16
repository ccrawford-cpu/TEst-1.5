import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Codecraft Academy.",
};

export default function ContactPage() {
  return (
    <>
      <section className="hero" style={{ paddingTop: "1rem" }}>
        <h1>Get in touch</h1>
        <p>Questions about the program, admissions, or partnerships? Send us a message.</p>
      </section>

      <p className="contact-info">
        Prefer email? Reach us directly at{" "}
        <a href="mailto:hello@codecraftacademy.example">hello@codecraftacademy.example</a>.
      </p>

      <ContactForm />
    </>
  );
}
