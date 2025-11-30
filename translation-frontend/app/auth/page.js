'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';

// const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_URL = "http://localhost:8000";



const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let response;
      let data;

      // --- LOGIN ---
      if (isLogin) {
        const formData = new URLSearchParams();
        formData.append("username", username);
        formData.append("password", password);

        response = await fetch(`${API_URL}/login`, {
          method: "POST",
          body: formData,
        });

        data = await response.json();
      }

      // --- REGISTER ---
      else {
        response = await fetch(`${API_URL}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        data = await response.json();
      }

      // --- SUCCESS ---
     // --- SUCCESS ---
if (response.ok) {

  // LOGIN : on connecte l'utilisateur
  if (isLogin) {
    localStorage.setItem("jwt_token", data.access_token);
    router.refresh();
    router.push("/translate");
  }

  // REGISTER : on montre un message et on repasse en mode login
  else {
    setError(""); 
    alert("Compte créé avec succès ! Vous pouvez maintenant vous connecter.");
    setIsLogin(true);  // bascule vers login
  }

} 


      // --- ERRORS ---
      else {
        if (Array.isArray(data.detail)) {
          setError(data.detail[0]?.msg || "Une erreur est survenue.");
        } else if (typeof data.detail === "object") {
          setError(data.detail.msg || "Une erreur est survenue.");
        } else {
          setError(data.detail || "Une erreur est survenue.");
        }
      }

    } catch (err) {
      console.error("Erreur inattendue :", err);
      setError("Impossible de se connecter au serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>{isLogin ? 'Connexion' : 'Inscription'} - TalAIt Translator</title>
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-300 animate-fade-in">
          <h1 className="text-3xl font-extrabold text-red-900 text-center mb-6">
            {isLogin ? 'Connexion' : 'Inscription'}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="username" className="block text-gray-700 font-medium mb-1">
                Nom d'utilisateur
              </label>
              <input
                type="text"
                id="username"
                placeholder="Entrez votre nom"
                className="w-full p-3 text-gray-500 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-900 focus:border-red-900 outline-none transition-all"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                placeholder="Entrez votre mot de passe"
                className="w-full p-3 text-gray-500 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-900 focus:border-red-900 outline-none transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="bg-red-100 text-red-900 p-3 rounded-lg text-sm border border-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-red-900 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-red-900 focus:ring-offset-2 focus:ring-offset-gray-50"
              disabled={loading}
            >
              {loading
                ? (isLogin ? 'Connexion...' : 'Inscription...')
                : (isLogin ? 'Se connecter' : "S'inscrire")}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-500 text-sm">
            {isLogin ? "Pas encore de compte ?" : "Déjà un compte ?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-red-900 font-medium hover:underline focus:outline-none"
            >
              {isLogin ? "S'inscrire" : "Se connecter"}
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
