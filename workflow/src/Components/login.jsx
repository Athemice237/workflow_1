import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let isAuthenticated = true;


  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
 //

 
    const loginData = {
      username,
      password,
    };

    try {
      
      const response = await axios.post("http://localhost:8000/api/token/", loginData);

      console.log("Connexion réussie :", response.data);

      //  stocke le token d'accès pour les requêtes sécurisées
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("isAuthenticated", isAuthenticated);
      console.log(isAuthenticated)
      //localStorage.removeItem("access_token")
      navigate("/dashboard"); // si connexion bon direction tb 
    } catch (err) {
      setLoading(false);
      console.error("Échec de la connexion :", err);
      localStorage.setItem("isAuthenticated", "false"); 
      if (err.response && err.response.data) {
        setError(Object.values(err.response.data).flat().join(' '));
      } else {
        setError("Erreur de connexion. Veuillez vérifier votre réseau et réessayer.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card bg-base-100 shadow-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Connexion</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Nom d'utilisateur</span>
            </div>
            <input
              type="text"
              placeholder="Entrez votre nom d'utilisateur"
              className="input input-bordered w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Mot de passe</span>
            </div>
            <input
              type="password"
              placeholder="Entrez votre mot de passe"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {error && <p className="text-error text-center">{error}</p>}
          <button 
            className={`btn btn-primary w-full ${loading ? 'loading' : ''}`} 
            type="submit"
            disabled={loading}
          >
            Se connecter
          </button>
        </form>
        <p className="text-center mt-4">
          Vous n'avez pas de compte ? <Link to="/inscription" className="link link-hover">Inscrivez-vous</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;