import Link from "next/link";

export function Nav() {
  return (
    <header className="site-header">
      <nav className="nav">
        <Link className="nav-brand" href="/">
          Codecraft Academy
        </Link>
        <ul className="nav-links">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
