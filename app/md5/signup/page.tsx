"use client";
import { useState } from 'react';
import { getSupabaseClient } from '../../../lib/supabaseClient';
import md5 from 'crypto-js/md5';
import Link from 'next/link';

export default function Md5SignupPage() {
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

    const passwordMd5 = md5(password).toString();
    const supabase = getSupabaseClient();
    const { error: insertError } = await supabase
      .from('users_md5')
      .insert({ email, password_md5: passwordMd5 });
    setIsLoading(false);
    if (insertError) {
      setError(insertError.message);
    } else {
      setMessage('Signup successful (MD5). You can try logging in now.');
      setEmail('');
      setPassword('');
    }
  }

  return (
    <section className="card">
      <h2>Signup (MD5)</h2>
      <p className="muted">Stores the MD5 hash of the password (still insecure for production).</p>
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
        Already registered? <Link href="/md5/login">Login</Link>
      </p>
    </section>
  );
}

