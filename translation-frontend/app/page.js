// src/app/page.js
import { redirect } from 'next/navigation';

export default function HomePage() {
  // Redirige par défaut vers la page d'authentification
  redirect('/auth');
}