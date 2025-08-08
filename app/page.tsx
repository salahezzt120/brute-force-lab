import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="grid">
      <section className="card">
        <h2>Insecure (Plaintext)</h2>
        <p>Stores passwords as-is. Demonstrates why this is unsafe.</p>
        <div className="row">
          <Link className="btn" href="/insecure/signup">Signup</Link>
          <Link className="btn" href="/insecure/login">Login</Link>
        </div>
      </section>

      <section className="card">
        <h2>MD5 Hashed</h2>
        <p>Stores MD5 hash of passwords. Better than plaintext but still insecure for real-world use.</p>
        <div className="row">
          <Link className="btn" href="/md5/signup">Signup</Link>
          <Link className="btn" href="/md5/login">Login</Link>
        </div>
      </section>
    </div>
  );
}

