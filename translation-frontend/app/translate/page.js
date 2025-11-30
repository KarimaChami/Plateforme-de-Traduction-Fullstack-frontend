// src/app/translate/page.js
'use client'; 

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';

// const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_URL = "http://localhost:8000";

const TranslatePage = () => {
  const [originalText, setOriginalText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [direction, setDirection] = useState('fr-to-en'); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Vérifier l'authentification au chargement de la page
    const token = localStorage.getItem('jwt_token');
    if (!token) {
      router.push('/auth');
    }
  }, [router]);

  const handleTranslate = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTranslatedText(''); 

    const token = localStorage.getItem('jwt_token');
    if (!token) {
      setError('Vous devez être connecté pour traduire.');
      setLoading(false);
      router.push('/auth');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/translate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ text: originalText, direction }),
      });

      const data = await response.json();

      if (response.ok) {
        setTranslatedText(data.translated_text);
      } else {
        if (response.status === 401) {
          localStorage.removeItem('jwt_token'); 
          router.push('/auth');
          setError('Votre session a expiré. Veuillez vous reconnecter.');
        } else {
          setError(data.detail || 'Erreur lors de la traduction.');
        }
      }
    } catch (err) {
      console.error('Erreur réseau ou inattendue:', err);
      setError('Impossible de communiquer avec le service de traduction. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Traduction - TalAIt Translator</title>
      </Head>

     <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
  <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl border border-gray-300 p-8 animate-fade-in">
    <h1 className="text-3xl font-extrabold text-red-900 text-center mb-8">Traduction Intelligente</h1>

    <form onSubmit={handleTranslate} className="space-y-6">
      <div>
        <label htmlFor="originalText" className="block text-gray-700 font-medium mb-2">Texte à traduire</label>
        <textarea
          id="originalText"
          placeholder="Entrez le texte ici..."
          value={originalText}
          onChange={(e) => setOriginalText(e.target.value)}
          className="w-full p-4 text-gray-500 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-900 focus:border-red-900 outline-none transition-all h-32 resize-y"
          required
        />
      </div>

      <div>
        <label htmlFor="direction" className="block text-gray-700 font-medium mb-2">Direction de traduction</label>
        <select
          id="direction"
          value={direction}
          onChange={(e) => setDirection(e.target.value)}
          className="w-full p-3 text-gray-700 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-900 focus:border-red-900 outline-none transition-all cursor-pointer"
        >
          <option value="fr-to-en">Français → Anglais</option>
          <option value="en-to-fr">Anglais → Français</option>
        </select>
      </div>

      {error && (
        <div className="bg-red-100 text-red-900 p-3 rounded-lg text-sm border border-red-300">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !originalText.trim()}
        className="w-full bg-red-900 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-red-900 focus:ring-offset-2 focus:ring-offset-gray-50"
      >
        {loading ? 'Traduction en cours...' : 'Traduire'}
      </button>
    </form>

    {translatedText && (
      <div className="mt-8 pt-6 border-t border-gray-300 animate-fade-in">
        <h2 className="text-xl font-bold text-red-900 mb-3">Texte traduit</h2>
        <div className="bg-gray-100 p-4 rounded-xl border border-gray-300 text-gray-900 min-h-[80px]">
          {translatedText}
        </div>
      </div>
    )}
  </div>
</div>

    </>
  );
};

export default TranslatePage;