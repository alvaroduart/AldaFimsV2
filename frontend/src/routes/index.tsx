import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import PrivateRoute from './PrivateRoute';

// Páginas públicas
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ContactPage from '../pages/ContactPage';
import MovieDetailsPage from '../pages/MovieDetailsPage';

// Páginas privadas
import FavoritesPage from '../pages/FavoritesPage';
import HistoryPage from '../pages/HistoryPage';

const AppRoutes: React.FC = () => {
  return (
    <Layout>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<RegisterPage />} />
        <Route path="/contato" element={<ContactPage />} />
        <Route path="/filme/:id" element={<MovieDetailsPage />} />
        
        {/* Rotas privadas */}
        <Route 
          path="/favoritos" 
          element={
            <PrivateRoute>
              <FavoritesPage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/historico" 
          element={
            <PrivateRoute>
              <HistoryPage />
            </PrivateRoute>
          } 
        />
        
        {/* Rota de fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

export default AppRoutes;
