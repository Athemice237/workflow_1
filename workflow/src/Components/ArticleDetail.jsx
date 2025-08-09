import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function ArticleDetail() {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Récupérons l'id de l'article à partir de l'URL

  useEffect(() => {
    // Fonction pour récupérer les détails de l'article à partir de l'API
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/articles/${id}/`);
        setArticle(response.data);
        setLoading(false); // Mettons à jour l'état de chargement une fois les données récupérées
      } catch (err) {
        setError("Impossible de charger l'article.");
        setLoading(false); // Mettons à jour l'état d'erreur si la requête échoue
        console.error("Erreur de chargement de l'article :", err.message);
      }
    };

    fetchArticle();
  }, [id]);// Le tableau de dépendances vide [] signifie que l'effet s'exécute une seule fois après le premier rendu du composant
// avec l'id de l'article récupéré depuis l'URL cela permet de charger les détails de l'article spécifique.
  if (loading) {
    return <div className="text-center py-20">
      <span className="loading loading-spinner loading-lg"></span>
      <p className="mt-4 text-xl">Chargement de l'article...</p>
    </div>;
  }

  // Affichons un message d'erreur si la requête a échoué
  if (error) {
    return <div className="text-center py-20 text-red-500">
      <h2 className="text-2xl font-bold mb-4">{error}</h2>
      <Link to="/" className="btn btn-primary">Retour à la page d'accueil</Link>
    </div>;
  }

  // Affichons un message si aucun article n'a été trouvé
  if (!article) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Article introuvable</h2>
        <Link to="/" className="btn btn-primary">Retour à la page d'accueil</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {article.image && ( // Vérifions si l'article a une image avant de l'afficher
        <img 
          src={`http://localhost:8000${article.image}`}
          alt={article.titre} 
          className="w-full h-64 object-cover rounded-lg mb-6" 
        />
      )}
      
      <h1 className="text-4xl font-bold mb-4">{article.titre}</h1>
      <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">{article.contenu}</p>
      
      <div className="mt-8">
        <Link to="/blog" className="btn btn-outline btn-secondary">← Retour à la page d'accueil</Link>
      </div>
    </div>
  );
}

export default ArticleDetail;
