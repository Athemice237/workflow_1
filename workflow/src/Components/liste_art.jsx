import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

function Article_liste(){
 

  const Liste_article = [
    {
      id: 1,
      title: 'jorgenXR',
      artist: 'A card component has a figure, a body part, and inside body there are title and actions parts Parfait pour illustrer la nature et l\'aventure. et aide a se savoir bien je suis de cette ecole qui pense que les jeune peuvent bien prendre ce qui leur chante meais moi nooin',
      image: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp',
  },
  {
    id: 2,
    title: 'Paysage Montagneux',
    artist: 'Parfait pour illustrer la nature et l\'aventure.',
    image: 'https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp',
    poinit:'...',
  },
  {
    id: 3,
    title: 'Paysage Montagneux',
    artist: 'Parfait pour illustrer la nature et l\'aventure.',
    image: 'https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp',
    poinit:'...',
  },
  {
    id: 4,
    title: 'Paysage Montagneux',
    artist: 'Parfait pour illustrer la nature et l\'aventure.',
    image: 'https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp',
    poinit:'...',
  },
  {
    id: 5,
    title: 'Paysage Montagneux',
    artist: 'Parfait pour illustrer la nature et l\'aventure. et aide a se savoir bien je suis de cette ecole qui pense que les jeune peuvent bien prendre ce qui leur chante meais moi nooin ',
    image: 'https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp',
    poinit:'...',
  },
  {
    id: 6,
    titre: "Mon premier article",
    extrait: "Un bel extrait du premier article.",
    auteur: user.email
  },
  {
    id: 7,
    titre: "Un autre récit",
    extrait: "Encore un petit morceau d'inspiration.",
    auteur: user.email
  }
  ]
  
    return(
    <div > 
    <div>
      <p>je suis un message visble pour tout et je suis ravi d'etre bien present</p>
    </div>   
    {Liste_article.map((art) =>(
        <div key={art.id} className="card lg:card-side bg-base-100 shadow-xl max-w-4xl mb-5 w-full">
          <img  className="lg:w-1/3" src={art.image} alt={art.title} />
          <div className="card-body lg:w-2/3">
              <h2 className="card-title text-2xl">{art.title}</h2>
              <p className="text-base py-4">{art.artist}{art.poinit}</p>
              <div className="card-actions justify-end">
                  <button className="btn btn-primary">Read</button>
              </div>
            </div>
       </div>))
    }
    </div>
    )
}

export default Article_liste;