import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './commponents/Layout/Header.jsx';
import Footer from './commponents/Layout/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import MapPage from './pages/MapPage.jsx';
import SitePage from './pages/SitePage.jsx';
import SubmitPage from './pages/SubmitPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import SiteList from './commponents/Sites/SiteList.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import AdminPage from './pages/AdminPage.jsx';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/sites" element={<SiteList />} />
          <Route path="/sites/:id" element={<SitePage />} />
          <Route path="/submit" element={<SubmitPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
