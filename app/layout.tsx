import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Security Lab Auth',
  description: 'Simple signup/login demos: plaintext and MD5 (for educational purposes only).',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="container">
          <header className="header">
            <h1>Security Lab: Auth Demos</h1>
            <p className="warning">Do not use plaintext or MD5 in real apps. This is for demonstration only.</p>
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}

