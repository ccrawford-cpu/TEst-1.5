import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <h1>Learn to code. Build real things.</h1>
        <p>
          Codecraft Academy is a hands-on coding program that takes you from
          your first line of code to shipping full projects — with mentors,
          cohorts, and a curriculum built around practice, not just theory.
        </p>
        <Link className="btn" href="/contact">
          Get in touch
        </Link>
      </section>

      <section>
        <h2>Why Codecraft</h2>
        <div className="cards">
          <div className="card">
            <h3>Project-based</h3>
            <p>Every module ends with something you built and can show off — not just a quiz score.</p>
          </div>
          <div className="card">
            <h3>Small cohorts</h3>
            <p>Learn alongside a small group of peers with direct access to instructors and mentors.</p>
          </div>
          <div className="card">
            <h3>Career support</h3>
            <p>Resume reviews, mock interviews, and introductions to hiring partners when you're ready.</p>
          </div>
        </div>
      </section>
    </>
  );
}
