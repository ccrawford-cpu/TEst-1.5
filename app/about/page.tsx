import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Codecraft Academy's mission, story, and team.",
};

export default function AboutPage() {
  return (
    <>
      <section className="hero" style={{ paddingTop: "1rem" }}>
        <h1>About Codecraft Academy</h1>
        <p>
          We started Codecraft Academy because we believe anyone with
          curiosity and persistence can learn to build software — they just
          need a clear path, real feedback, and people who've done it before.
        </p>
      </section>

      <section>
        <h2>Our story</h2>
        <p>
          Codecraft Academy began as a weekend workshop for career-changers
          who wanted a practical, no-fluff way into software development. A
          few cohorts later, it grew into a full program covering web
          development, data fundamentals, and the collaboration skills that
          make a good engineer great — version control, code review, and
          clear communication.
        </p>
      </section>

      <section>
        <h2>What we value</h2>
        <div className="cards">
          <div className="card">
            <h3>Learning by doing</h3>
            <p>Concepts stick when you apply them immediately to a real problem.</p>
          </div>
          <div className="card">
            <h3>Honest feedback</h3>
            <p>We tell you what's working and what isn't, early and often.</p>
          </div>
          <div className="card">
            <h3>Community</h3>
            <p>Your cohort and mentors are part of your network long after graduation.</p>
          </div>
        </div>
      </section>

      <section>
        <h2>Meet the team</h2>
        <div className="team">
          <div className="team-member">
            <div className="avatar">JR</div>
            <div className="name">Jordan Reyes</div>
            <div className="role">Founder &amp; Lead Instructor</div>
          </div>
          <div className="team-member">
            <div className="avatar">PK</div>
            <div className="name">Priya Kapoor</div>
            <div className="role">Curriculum Director</div>
          </div>
          <div className="team-member">
            <div className="avatar">SM</div>
            <div className="name">Sam Mitchell</div>
            <div className="role">Career Coach</div>
          </div>
        </div>
      </section>
    </>
  );
}
