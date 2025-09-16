
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';

import LoginPage from '@/pages/auth/LoginPage';
import ActivateAccountPage from '@/pages/auth/ActivateAccountPage';
import { AuthProvider } from '@/context/AuthContext';
import HomePage from '@/pages/HomePage'
import About from '@/pages/About'
import Policies from '@/pages/Policies'
import Team from '@/pages/Team'
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage';

const AppRoutes = () => {
  return (
    <AuthProvider>
    <Routes>
      {/* --- PUBLIC ROUTES --- */}

      <Route path="/" element={<HomePage />} />
         <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
               <Route path="/policies" element={<Policies />} />
                   <Route path="/forget" element={<ForgotPasswordPage />} />
      
      <Route path="/login" element={<LoginPage />} />
      <Route path="/activate-account" element={<ActivateAccountPage />} />
      
      {/* --- PRIVATE ROUTES --- */}
      <Route path="/*" element={<PrivateRoutes />} />
    </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;