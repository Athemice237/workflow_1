import { Outlet, Link } from "react-router-dom";
import React from "react";


function Layout(){
 
  const store = window.localStorage
  let isAuthenticated = store.getItem("isAuthenticated");
  
  console.log('test');
  return (
    <>
  {/* notre navbar  */}
  <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><Link to="/blog" className="btn btn-ghost">Blogs</Link></li>
        <li><Link to="/" className="btn btn-ghost">Home</Link></li>
        <li><Link to="/contact" className="btn btn-ghost">Contact</Link></li>
        <li><Link to="/apropos" className="btn btn-ghost">A Propos De Nous</Link></li>
        <li><Link to="/messageUser" className="btn btn-ghost">Avis De Nos Utilisateur</Link></li>
        <li><Link to="/profil" className="btn btn-ghost">proli user</Link></li>
        <li><Link to="/catgorie" className="btn btn-ghost">Nos categories</Link></li>
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">les l'ame de la plume</a>
  </div>
  <div className="navbar-center hidden lg:flex ">
    <ul className="menu menu-horizontal px-1">
      <li><Link to="/" className="btn btn-ghost">Home</Link></li>
      <li>
      <Link to="/blog" className="btn btn-ghost">Blogs</Link>
      </li>
      <li><Link to="/contact" className="btn btn-ghost">Contact</Link></li>
      <li><Link to="/apropos" className="btn btn-ghost">A Propos De Nous</Link></li>
      <li><Link to="/messageUser" className="btn btn-ghost">Vos Avis</Link></li>
      <li><Link to="/write_article" className="btn btn-ghost">ecrire l'article</Link></li>
      <li><Link to="/catgorie" className="btn btn-ghost">Nos categories</Link></li>
      { !isAuthenticated ? <li><Link to="/dashboard" className="btn btn-ghost">dashboard</Link></li> : ""}
    </ul>
  </div>
  <div className="navbar-end gap-2" >
  <Link to="/login" className="btn btn-neutral">Connexion</Link>
  <Link to="/inscription" className="btn btn-active btn-secondary">inscription</Link>
  </div>
</div>
<main className="max-h-full bg-base-200 grid place-items-center p-4 w-full">
<Outlet />
</main>
<footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
  <nav>
    <h6 className="footer-title">Services</h6>
    <a className="link link-hover">Branding</a>
    <a className="link link-hover">Design</a>
    <a className="link link-hover">Marketing</a>
    <a className="link link-hover">Advertisement</a>
  </nav>
  <nav>
    <h6 className="footer-title">Company</h6>
    <a className="link link-hover">About us</a>
    <a className="link link-hover">Contact</a>
    <a className="link link-hover">Jobs</a>
    <a className="link link-hover">Press kit</a>
  </nav>
</footer>
</>
)
};

export default Layout;
