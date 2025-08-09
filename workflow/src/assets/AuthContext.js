// src/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null si déconnecté, objet utilisateur si connecté

  // Simule la récupération de l'utilisateur lors du chargement initial
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (username, password) => {
    // Dans une vraie application, vous vérifieriez le mot de passe avec le backend.
    // Ici, nous simulons une connexion réussie pour n'importe quel nom d'utilisateur.
    const authenticatedUser = { name: username, photo: `https://i.pravatar.cc/150?u=${username}` };
    setUser(authenticatedUser);
    localStorage.setItem('currentUser', JSON.stringify(authenticatedUser));
    return true; // Connexion réussie
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  // Les valeurs que le contexte rendra disponibles aux composants enfants
  const authContextValue = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};