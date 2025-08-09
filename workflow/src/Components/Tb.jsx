import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [userArticles, setUserArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const API_URL = "http://localhost:8000/api";

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      navigate("/login");
      return;
    }
    
    const fetchUserData = async () => {
      try {
        // ➡️ Endpoint pour obtenir les infos de l'utilisateur basé sur le token
        const userResponse = await axios.get(`${API_URL}/user/me/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUser(userResponse.data);

        // ➡️ Requête pour obtenir tous les articles
        const articlesResponse = await axios.get(`${API_URL}/articles/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        
        // ➡️ On filtre les articles côté client
        const filteredArticles = articlesResponse.data.filter(
          (article) => article.user_info.id === userResponse.data.id
        );

        const sortedArticles = filteredArticles.sort(
          (a, b) => new Date(b.date_creation) - new Date(a.date_creation)
        );
        setUserArticles(sortedArticles);
        setLoading(false);
      } catch (err) {
        console.error("Erreur de chargement du tableau de bord :", err);
        localStorage.removeItem("access_token");
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 p-6 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-base-200 p-6 flex flex-col items-center justify-center">
        <p className="text-2xl text-error font-bold mb-4">{error}</p>
        <button onClick={handleLogout} className="btn btn-error">Se déconnecter</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-6">Tableau de bord</h1>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card bg-base-100 shadow-md p-4">
            <h2 className="text-xl font-semibold">Bienvenue</h2>
            {user && (
              <>
                <p className="text-base-content mt-2 font-bold">{user.username}</p>
                <p className="text-sm text-base-content">{user.email}</p>
              </>
            )}
          </div>

          <div className="card bg-base-100 shadow-md p-4">
            <h2 className="text-xl font-semibold">Articles publiés</h2>
            <p className="text-3xl font-bold mt-2">{userArticles.length}</p>
          </div>

          <div className="card bg-base-100 shadow-md p-4">
            <h2 className="text-xl font-semibold">Actions rapides</h2>
            <div className="mt-2 space-y-2">
              <Link to="/ecrire" className="btn btn-sm btn-primary w-full">Nouvel article</Link>
              <Link to="/blog" className="btn btn-sm btn-secondary w-full">Voir le blog</Link>
              <button onClick={handleLogout} className="btn btn-sm btn-error w-full">Se déconnecter</button>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl p-6">
          <h2 className="text-2xl font-semibold mb-4">Mes articles</h2>
          {userArticles.length === 0 ? (
            <p className="text-base-content">Vous n'avez pas encore publié d'article.</p>
          ) : (
            <ul className="space-y-4">
              {userArticles.map((article) => (
                <li key={article.id} className="border p-4 rounded-lg">
                  <h3 className="text-lg font-bold">{article.titre}</h3>
                  <p className="text-sm text-base-content mt-1">{article.contenu.substring(0, 100)}...</p>
                  <div className="mt-2 text-right">
                    <Link to={`/article/${article.id}`} className="link link-primary text-sm">Lire l'article</Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;