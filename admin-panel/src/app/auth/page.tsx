// src/app/auth/page.tsx

import { AuthCard } from "@/page-component/auth/AuthForm";

export default function AuthPage() {
  return (
    <main style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      width: '100%'
    }}>
      <AuthCard />
    </main>
  );
}