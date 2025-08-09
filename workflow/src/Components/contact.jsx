import React, { useState } from "react";
import axios from "axios"; // ⬅️ On importe axios

const ContactUs = () => {
  // 1. On utilise les hooks d'état pour gérer les champs du formulaire
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" }); // Pour afficher un message de succès ou d'erreur

  // 2. Fonction de gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    setLoading(true);
    setStatusMessage({ type: "", text: "" });

    try {
      // 3. Objet des données à envoyer à l'API
      const formData = {
        name,
        email,
        message,
      };

      // 4. Envoi des données via une requête POST
      // L'URL de l'API doit être créée dans votre backend Django
      const response = await axios.post("http://localhost:8000/api/contact/", formData);

      // Si la requête réussit, on affiche un message de succès
      setStatusMessage({ 
        type: "success", 
        text: "Votre message a été envoyé avec succès !" 
      });
      // On réinitialise les champs du formulaire
      setName("");
      setEmail("");
      setMessage("");

    } catch (error) {
      // En cas d'erreur, on affiche un message d'erreur
      console.error("Échec de l'envoi du message :", error);
      setStatusMessage({ 
        type: "error", 
        text: "Échec de l'envoi. Veuillez réessayer plus tard." 
      });
    } finally {
      setLoading(false); // On arrête l'état de chargement
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-5">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-primary mb-10">Contactez-nous</h1>

        <div className="card shadow-lg bg-base-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nom */}
            <div>
              <label className="label">
                <span className="label-text">Nom</span>
              </label>
              <input
                type="text"
                placeholder="Votre nom"
                className="input input-bordered w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="label">
                <span className="label-text">Adresse e-mail</span>
              </label>
              <input
                type="email"
                placeholder="votre@email.com"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Message */}
            <div>
              <label className="label">
                <span className="label-text">Message</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full"
                rows="5"
                placeholder="Votre message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>
            
            {/* Affichage du message de succès ou d'erreur */}
            {statusMessage.text && (
              <div 
                className={`text-center p-4 rounded-lg ${statusMessage.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
              >
                {statusMessage.text}
              </div>
            )}

            {/* Bouton */}
            <div className="text-center">
              <button 
                type="submit" 
                className={`btn btn-primary ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                {loading ? "Envoi en cours..." : "Envoyer"}
              </button>
            </div>
          </form>
        </div>

        {/* Informations de contact */}
        <div className="mt-12 text-center text-base-content">
          <p>Email : <a className="link link-hover" href="mailto:contact@exemple.com">contact@exemple.com</a></p>
          <p>Téléphone : <a className="link link-hover" href="tel:+33123456789">+237 678 38 35 94</a></p>
          <p>Adresse : 123 rue de l’Innovation, Ebang, Yaoundé</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
