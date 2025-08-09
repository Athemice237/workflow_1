'use client'
import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import  Connexion from './Components/login'
import  Home from './Components/home'
import InscriptionForm from './Components/inscription'
import Layout from './Components/layout'
import Test from './Components/blog'
import Contact from './Components/contact'
import Login from "./Components/login";
import MessageList from './Components/UserMessage'
import ArticleDetail from './Components/ArticleDetail';
import AboutUs from './Components/apropos';
import CreateArticle from './Components/write_art';
import Dashboard from './Components/Tb';

function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
          <Route path="blog" element={<Test />} />
          <Route path="/login" element={<Login />} />
          <Route path="Contact" element={<Contact />} />
          <Route path="Connexion" element={<Connexion />} />
          <Route path="/messageUser" element={<MessageList />} />
          <Route path="/inscription" element={<InscriptionForm/>} />
          <Route path="/article/:id" element={<ArticleDetail />} />
          <Route path="/apropos" element={<AboutUs />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/write_article" element={<CreateArticle />} />
        </Route>
      </Routes>
    </Router>
  )
}
export default App;