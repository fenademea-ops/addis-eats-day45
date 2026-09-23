import Link from "next/link";

export default function NotFound() {
  return <main className="shell simple-page not-found"><p className="not-found-code">404</p><h1>That dish is off the menu.</h1><p>Try one of our other Ethiopian favorites.</p><Link className="button" href="/menu">Browse the menu</Link></main>;
}