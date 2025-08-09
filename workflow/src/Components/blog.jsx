import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Blog() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/articles/");
        const sortedArticles = response.data.sort((a, b) => new Date(b.date_creation) - new Date(a.date_creation)); // Tri des articles par date de création, du plus récent au plus ancien
        setArticles(sortedArticles); // Mettre à jour l'état avec les articles triés
        setLoading(false);
      } catch (err) {
        setError("Impossible de charger les articles. Veuillez vérifier votre connexion au serveur.");
        setLoading(false);
        console.error("Erreur de chargement des articles :", err);
      }
    };
    fetchArticles();
  }, []);


  if (loading) {
    return (
      <div className="bg-gray-100 dark:bg-gray-900 py-20 min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }


  if (error) {
    return (
      <div className="bg-gray-100 dark:bg-gray-900 py-20 min-h-screen text-center flex flex-col justify-center items-center">
        <p className="text-2xl font-bold text-red-500 mb-4">{error}</p>
        <button onClick={() => window.location.reload()} className="btn btn-secondary">Réessayer</button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 py-10 px-4 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="text-center py-12 md:py-16 mb-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100">
            Tous les articles
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Découvrez nos dernières publications sur une variété de sujets.
          </p>
        </header>

        {articles.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-500 dark:text-gray-400">Aucun article n'a été trouvé.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {articles.map((article) => (
              <div
                key={article.id}
                className="card bg-white dark:bg-gray-800 shadow-xl overflow-hidden rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                <figure className="h-56 overflow-hidden">
                  <img
                    src={article.image ? `http://localhost:8000${article.image}` : 'https://placehold.co/600x400/374151/FFF?text=Image+Manquante'}
                    alt={article.titre}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </figure>
                <div className="card-body p-6">
                  <h2 className="card-title text-2xl font-bold mb-2">
                    {article.titre}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {article.contenu.substring(0, 150)}...
                  </p>
                  <div className="card-actions justify-end">
                    <Link
                      to={`/article/${article.id}`}
                      className="btn btn-outline btn-primary transform transition-transform duration-300 hover:-translate-y-0.5"
                    >
                      Lire l'article
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Blog;
