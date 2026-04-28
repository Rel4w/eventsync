'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async () => {
    setLoading(true);
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
      alert('Compte créé avec succès ! Connectez-vous.');
      router.push('/login');
    } else {
      const data = await res.json();
      alert(data.error || 'Erreur lors de la création');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D0D0D]">
      <Card className="w-full max-w-md glass-card">
        <CardHeader>
          <CardTitle className="text-2xl text-white text-center">Créer un compte Admin</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Nom complet" value={name} onChange={(e) => setName(e.target.value)} />
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button onClick={handleSignup} disabled={loading} className="w-full btn-primary">
            {loading ? 'Création...' : 'Créer le compte'}
          </Button>
          <p className="text-center text-sm text-[#666]">
            Déjà un compte ? <a href="/login" className="text-[#A8FF3E] hover:underline">Se connecter</a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}