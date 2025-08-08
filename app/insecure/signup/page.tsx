"use client";
import { useState } from 'react';
import { getSupabaseClient } from '../../../lib/supabaseClient';
import Link from 'next/link';

export default function InsecureSignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setIsLoading(true);
    const supabase = getSupabaseClient();
    const { error: insertError } = await supabase
      .from('users_insecure')
      .insert({ email, password_plaintext: password });
    setIsLoading(false);
    if (insertError) {
      setError(insertError.message);
    } else {
      setMessage('Signup successful (plaintext). You can try logging in now.');
      setEmail('');
      setPassword('');
    }
  }

  return (
    <section className="card">
      <h2>Signup (Insecure: Plaintext)</h2>
      <p className="muted">Stores the password as plaintext in the database. For demo only.</p>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button className="btn" type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting…' : 'Create account'}
        </button>
      </form>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
      <p className="muted" style={{ marginTop: 12 }}>
        Already registered? <Link href="/insecure/login">Login</Link>
      </p>
    </section>
  );
}

