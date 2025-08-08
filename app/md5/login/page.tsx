"use client";
import { useState } from 'react';
import { getSupabaseClient } from '../../../lib/supabaseClient';
import md5 from 'crypto-js/md5';
import Link from 'next/link';

export default function Md5LoginPage() {
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
    const { data, error: selectError } = await supabase
      .from('users_md5')
      .select('id')
      .eq('email', email)
      .eq('password_md5', passwordMd5)
      .maybeSingle();
    setIsLoading(false);
    if (selectError) {
      setError(selectError.message);
    } else if (!data) {
      setError('Invalid credentials');
    } else {
      setMessage('Logged in (MD5 version).');
      setEmail('');
      setPassword('');
    }
  }

  return (
    <section className="card">
      <h2>Login (MD5)</h2>
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
          {isLoading ? 'Checking…' : 'Login'}
        </button>
      </form>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
      <p className="muted" style={{ marginTop: 12 }}>
        Need an account? <Link href="/md5/signup">Signup</Link>
      </p>
    </section>
  );
}

