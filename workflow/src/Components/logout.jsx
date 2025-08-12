import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


// notre function pour supprimer le token de l'utisateur dans localStorage
const Logout = () => {
  const navigate = useNavigate();

  let token = localStorage.getItem("access_token");

  useEffect(() => {

     if(!token){
        localStorage.removeItem("access_token")
        navigate("/login");
     }else{
        console.log("je ne vois rien pas ici ")
     }
  
  }, [navigate]); // Le tableau de dépendances garantit que le code s'exécute une seule fois

  return (
    <div className="btn btn-sm btn-error w-full">
      <p>Déconnexion en cours...</p>
    </div>
  );
};

export default Logout;



