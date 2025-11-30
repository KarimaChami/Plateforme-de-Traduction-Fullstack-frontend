// src/components/Header.js
'use client'; 

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Vérifie l'état de connexion côté client
    const token = localStorage.getItem('jwt_token');
    setIsLoggedIn(!!token);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('jwt_token');
    setIsLoggedIn(false);
    router.push('/auth');
  };

  return (
    <header className="w-full bg-dark-card/80 backdrop-blur-sm shadow-lg z-20 p-4 sticky top-0">
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/">
          <span className="text-2xl font-bold text-primary-red hover:text-light-grey-text transition-colors cursor-pointer">
            TalAIt Translator
          </span>
        </Link>
        <div>
          {isLoggedIn ? (
            <>
              <Link href="/translate">
                <span className={`px-3 py-2 rounded-md transition-colors cursor-pointer ${pathname === '/translate' ? 'text-primary-red border border-primary-red' : 'text-light-grey-text hover:text-primary-red'}`}>
                  Traduction
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="text-light-grey-text hover:text-primary-red px-3 py-2 rounded-md transition-colors cursor-pointer ml-4"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <Link href="/auth">
              <span className={`px-3 py-2 rounded-md transition-colors cursor-pointer ${pathname === '/auth' ? 'text-primary-red border border-primary-red' : 'text-light-grey-text hover:text-primary-red'}`}>
                Connexion
              </span>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;