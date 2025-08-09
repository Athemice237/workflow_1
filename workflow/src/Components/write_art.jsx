import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateArticle = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date_creation, setDateCreation] = useState(new Date().toISOString().slice(0, 10));
  const [date_publication, setDatePublication] = useState("");
  const [publier, setPublier] = useState(false);
  const [image, setImage] = useState(null);
  const [categorie, setCategorie] = useState("");
  const navigate = useNavigate();

  // Utilisez l'état pour savoir si l'utilisateur est connecté
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    // Vérifier si un token existe au chargement du composant
    const userToken = localStorage.getItem('access_token');
    if (userToken) {
      setIsUserLoggedIn(true);
    }
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // ➡️ Récupérer le token JWT depuis le localStorage
    const userToken = localStorage.getItem('access_token');
    
    if (!userToken) {
      alert("Vous devez être connecté pour publier un article.");
      return;
    }

    const formData = new FormData();
    formData.append("titre", title);
    formData.append("contenu", content);
    formData.append("categori", categorie);
    
    if (image) {
      formData.append("image", image);
    }
    formData.append("date_creation", date_creation);
    formData.append("date_publication", date_publication);
    formData.append("publier", publier);

    try {
      // ➡️ Ajout de l'en-tête d'autorisation avec le token
      const response = await axios.post(
        "http://localhost:8000/api/articles/",
        formData, 
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${userToken}`, // ⬅️ L'en-tête d'autorisation est ajouté ici
          },
        }
      );

      console.log("Article créé avec succès :", response.data);

      setTitle("");
      setContent("");
      setImage(null);
      navigate("/blog");
    } catch (error) {
      console.error("Échec de la publication de l'article :", error);
      if (error.response) {
        // ➡️ Gérer spécifiquement les erreurs 401 (non autorisé)
        if (error.response.status === 401) {
            alert("Votre session a expiré ou vous n'êtes pas autorisé. Veuillez vous reconnecter.");
        } else {
            console.error("Détails de l'erreur :", error.response.data);
            alert(`Erreur de validation. Détails : ${JSON.stringify(error.response.data)}`);
        }
      } else {
        alert("La publication a échoué. Veuillez vérifier votre connexion.");
      }
    }
  };

  // Si l'utilisateur n'est pas connecté, afficher un message d'erreur
  if (!isUserLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 p-4">
        <p className="text-2xl text-error font-bold mb-4">Vous devez être connecté pour créer un article.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-3xl mx-auto card bg-base-100 shadow-lg p-8">
        <h1 className="text-3xl font-bold text-primary text-center mb-6">Écrire un article</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Titre de l'article"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full"
            required
          />
          <textarea
            placeholder="Contenu de l'article"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="textarea textarea-bordered w-full"
            rows="6"
            required
          ></textarea>
          <input
            type="text"
            placeholder="Catégorie de l'article"
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
            className="input input-bordered w-full"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange} 
            className="file-input file-input-bordered w-full" 
          />
          <input
            type="date"
            value={date_publication}
            onChange={(e) => setDatePublication(e.target.value)}
            className="input input-bordered w-full"
            required
          />
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="publier"
              checked={publier} 
              onChange={(e) => setPublier(e.target.checked)}
              className="checkbox checkbox-primary"
            />
            <label htmlFor="publier">Publier cet article</label>
          </div>
          <button type="submit" className="btn btn-primary w-full">Publier</button>
        </form>
      </div>
    </div>
  );
};

export default CreateArticle;
