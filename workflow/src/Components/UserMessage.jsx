import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MessageList() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:8000/api";
  

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      setError(null);
      const userToken = localStorage.getItem('access_token');

      // ➡️ Si l'utilisateur n'est pas connecté, on ne fait pas la requête et on affiche un message d'erreur
      if (!userToken) {
        setError("Accès non autorisé. Vous devez être connecté pour voir les messages.");
        setLoading(false);
        return;
      }

      const headers = {
        Authorization: `Bearer ${userToken}`,
      };

      try {
        // ➡️ Requête GET sécurisée pour récupérer la liste des messages
        const response = await axios.get(`${API_URL}/messages/`, { headers });
        setMessages(response.data);
      } catch (err) {
        console.error("Erreur de récupération des messages:", err);
        // Ajout d'un log plus détaillé pour t'aider à débugger
        if (err.response) {
            console.error("Réponse du serveur:", err.response.data);
            console.error("Statut HTTP:", err.response.status);
            console.error("En-têtes:", err.response.headers);
            // On gère les erreurs, notamment le cas où le token est invalide (401)
            if (err.response.status === 401) {
              setError("Accès non autorisé. Votre session a peut-être expiré. Veuillez vous reconnecter.");
            } else {
              setError(`Erreur ${err.response.status}: Impossible de charger les messages. Veuillez réessayer.`);
            }
        } else if (err.request) {
            console.error("La requête a été faite, mais aucune réponse n'a été reçue.");
            setError("Aucune réponse du serveur. Vérifiez que le backend est en cours d'exécution.");
        } else {
            console.error("Erreur lors de la configuration de la requête:", err.message);
            setError("Erreur de connexion. Veuillez vérifier votre connexion.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 p-4">
        <p className="text-2xl text-error font-bold mb-4">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-10 px-5">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-primary mb-10">Messages des utilisateurs</h1>
        {messages.length === 0 ? (
          <div className="text-center text-xl text-gray-500">Aucun message trouvé.</div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {messages.map((msg) => (
              <div key={msg.id} className="card shadow-lg bg-base-100 p-6 rounded-box">
                <h2 className="text-lg font-bold text-primary">{msg.name}</h2>
                <p className="text-sm text-gray-500 mb-2">{msg.email}</p>
                <div className="divider"></div>
                <p className="whitespace-pre-line">{msg.message}</p>
                <p className="text-xs text-gray-400 mt-4">Reçu le: {new Date(msg.date_sent).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageList;
