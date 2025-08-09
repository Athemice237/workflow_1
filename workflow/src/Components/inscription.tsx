import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function InscriptionForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.password2) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      await axios.post('http://localhost:8000/api/register/', formData);
      setSuccess('Inscription réussie ! Vous pouvez maintenant vous connecter.');
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      console.error("Erreur d'inscription:", err);
      if (err.response && err.response.data) {
        const errorMessages = Object.values(err.response.data).flat().join(' ');
        setError(errorMessages);
      } else {
        setError('Une erreur inattendue est survenue.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-full max-w-sm shadow-xl bg-base-100 p-8">
        <h1 className="card-title text-3xl font-bold text-center mb-6 text-neutral">
          Inscription
        </h1>
        <form onSubmit={handleSubmit} className="card-body p-0">
          
          {error && <div className="alert alert-error mb-4">{error}</div>}
          {success && <div className="alert alert-success mb-4">{success}</div>}

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Nom d'utilisateur</span>
            </label>
            <input
              type="text"
              name="username"
              placeholder="Entrez votre nom d'utilisateur"
              className="input input-bordered w-full"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Votre email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Entrez votre email"
              className="input input-bordered w-full"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Votre mot de passe</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Entrez votre mot de passe"
              className="input input-bordered w-full"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text">Confirmez votre mot de passe</span>
            </label>
            <input
              type="password"
              name="password2"
              placeholder="Confirmez votre mot de passe"
              className="input input-bordered w-full"
              value={formData.password2}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control mt-4">
            <button type="submit" className="btn btn-primary w-full">
              S'inscrire
            </button>
          </div>
        </form>
        <p className="text-center mt-4">
          <Link to="/login" className="link link-hover">
            Retour à la connexion
          </Link>
        </p>
      </div>
    </div>
  );
}

export default InscriptionForm;