Security Lab: Simple Signup/Login (Plaintext vs MD5)

Setup

1) Create the tables and policies in Supabase
- Open Supabase SQL editor for your project
- Paste and run the SQL in `supabase.sql`

2) Configure environment
- Create a `.env.local` file with:

```
NEXT_PUBLIC_SUPABASE_URL=YOUR_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

3) Install and run

```
npm install
npm run dev
```

Open `http://localhost:3000`.

Notes

- This app intentionally demonstrates insecure practices (plaintext and MD5) for educational purposes only.
- Do not reuse real credentials.

