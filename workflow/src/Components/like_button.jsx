// src/Components/LikeButton.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LikeButton = ({ articleId }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    const API_URL = "http://localhost:8000/api";

    // 1. Fonction pour vérifier l'état du like et récupérer le nombre total de likes
    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const accessToken = localStorage.getItem("access_token");
                const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

                // Requête pour obtenir le nombre total de likes pour cet article
                const response = await axios.get(`${API_URL}/articles/${articleId}/likes/`); // Endpoint à créer si tu veux le nombre de likes

                // Si tu veux vérifier si l'utilisateur connecté a déjà liké
                // Il faudrait un endpoint spécifique pour cela
                if (accessToken) {
                    const userLikedResponse = await axios.get(`${API_URL}/articles/${articleId}/is_liked/`, { headers });
                    setIsLiked(userLikedResponse.data.is_liked);
                }

                // setLikeCount(response.data.count);
            } catch (err) {
                console.error("Erreur de chargement des likes:", err);
            }
        };

        fetchLikes();
    }, [articleId]);

    // 2. Fonction pour gérer le clic sur le bouton
    const handleLikeClick = async () => {
        const accessToken = localStorage.getItem("access_token");

        if (!accessToken) {
            alert("Veuillez vous connecter pour aimer cet article.");
            return;
        }

        try {
            if (isLiked) {
                // Si l'article est déjà liké, on envoie une requête DELETE pour le retirer
                await axios.delete(`${API_URL}/articles/${articleId}/like/`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setIsLiked(false);
                setLikeCount(prevCount => prevCount - 1);
            } else {
                // Sinon, on envoie une requête POST pour l'ajouter
                await axios.post(
                    `${API_URL}/articles/${articleId}/like/`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                setIsLiked(true);
                setLikeCount(prevCount => prevCount + 1);
            }
        } catch (error) {
            console.error("Erreur lors de la gestion du like:", error);
            alert(error.response?.data?.detail || "Une erreur est survenue.");
        }
    };

    return (
        <div className="flex items-center space-x-2">
            <button onClick={handleLikeClick} className="btn btn-sm">
                {isLiked ? '❤️' : '🤍'} {isLiked ? 'J\'aime' : 'J\'aime'}
            </button>
            <span>{likeCount} J'aime</span>
        </div>
    );
};

export default LikeButton;