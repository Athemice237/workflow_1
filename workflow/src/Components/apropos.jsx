import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-base-100 py-10 px-5">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-primary mb-8">À propos de nous</h1>
        
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <img
            src="/image/font3g.jpg"
            alt="Notre équipe"
            className="rounded-box shadow-lg"
          />

          
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-secondary">Qui sommes-nous ?</h2>
            <p className="text-base-content mb-4">
              Nous sommes une équipe passionnée par la technologie et l'innovation. Notre objectif est de créer des solutions web modernes et accessibles à tous.
            </p>
            <p className="text-base-content">
              Depuis notre création, nous nous efforçons de construire des applications intuitives, performantes et orientées utilisateur. Notre équipe est composée de développeurs, designers et stratèges passionnés.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-xl font-semibold text-primary mb-4">Nos valeurs</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-success">✔</span> Innovation constante
            </li>
            <li className="flex items-start gap-3">
              <span className="text-success">✔</span> Collaboration et transparence
            </li>
            <li className="flex items-start gap-3">
              <span className="text-success">✔</span> Accessibilité pour tous
            </li>
            <li className="flex items-start gap-3">
              <span className="text-success">✔</span> Respect de l’utilisateur
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
