import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
   
    const fetchCategories = async () => {
      try {
        
        setLoading(true);
        const response = await axios.get('http://localhost:8000/api/categories/');
        setCategories(response.data); 
        console.log("*********************************************")
        console.log(response.data);

      } catch (err) {
        
        setError('Impossible de charger les catégories. Veuillez vérifier votre API.');
        console.error('Erreur lors du chargement des catégories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
    
    //
  }, []);


  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-xl text-gray-500">Chargement des catégories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-base-200">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Nos categorie</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loading && <p>Chargement des categories...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && categories.map((category) => (
              <div key={category.id} className="card bg-base-100 shadow-xl">
                <figure>
                  <img 
                    src={category.image}  
                    className="h-48 w-full object-cover" 
                  />
                </figure>
                <div className="card-body">
                  <h3 className="card-title">{category.titre}</h3>
                  <p>{category.contenu.substring(0, 100)}...</p> 
                  <div className="card-actions justify-end">
                    <Link to={`/catgorie/${category.id}`} className="btn btn-outline btn-primary">Lire</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/blog" className="btn btn-secondary">Voir tous les categories</Link>
          </div>
        </div>
      </section>
  );

  
};



export default Categories;
