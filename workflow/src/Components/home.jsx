import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {

  const [articles, setArticles] = useState([]); 
  
  const [loading, setLoading] = useState(true); 
 
  const [error, setError] = useState(null); 

  useEffect(() => {
    // Fonction asynchrone pour faire la requête à l'API
    const fetchArticles = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/articles/");

        setArticles(response.data.slice(-3).reverse());

        setLoading(false);
      } catch (err) {
        setError("Impossible de charger les articles.");
        setLoading(false);
        console.error("Erreur de chargement des articles :", err);
      }
    };
    fetchArticles();
  }, []); // Le tableau vide [] s'assure que cette fonction ne s'exécute qu'une seule fois au chargement du composant


  
  return (
    <div className="w-full">
      <section
        className="relative h-[80vh] flex items-center justify-center bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/image/curved-display-pinky-girl.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold">Bienvenue sur mon blog</h1>
          <p className="mt-4 text-lg md:text-xl">L’âme de la plume – entre mots et images</p>
          <Link to="/blog" className="btn btn-primary mt-6">Explorer les articles</Link>
        </div>
      </section>

      <section className="py-16 bg-base-200">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Derniers Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Affichage conditionnel  */}
            {loading && <p>Chargement des articles...</p>}
            {error && <p className="text-red-500">{error}</p>}
            
            {!loading && !error && articles.map((article) => (
              <div key={article.id} className="card bg-base-100 shadow-xl">
                <figure>
                  {/* Utilisation de l'image de l'API avec une image de remplacement en cas d'absence */}
                  <img 
                    src={article.image ? `http://localhost:8000${article.image}` : '/image/font3g.jpg'} 
                    alt={article.titre} 
                    className="h-48 w-full object-cover" 
                  />
                </figure>
                <div className="card-body">
                  <h3 className="card-title">{article.titre}</h3>
                  <p>{article.contenu.substring(0, 100)}...</p> 
                  <div className="card-actions justify-end">
                    <Link to={`/article/${article.id}`} className="btn btn-outline btn-primary">Lire</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/blog" className="btn btn-secondary">Voir tous les articles</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
