import React from 'react';
import { Routes, Route, Navigate, BrowserRouter as Router } from 'react-router-dom';
import TopNav from './components/TopNavBar/TopNav';
import SideNav from './components/SideNav/SideNav';
// import Stores from './pages/Stores';
// import SKUs from './pages/SKUs';
// import Planning from './pages/Planning';
// import ChartPage from './pages/ChartPage';
import Login from './pages/Login';
import { useAuth } from './contexts/AuthContext';
import Box from '@mui/material/Box';
import MainLayout from './MainLayout';
import  { lazy, Suspense } from "react";

const Stores = lazy(() => import("./pages/Stores"));
const SKUs = lazy(() => import("./pages/SKUs"));
const Planning = lazy(() => import("./pages/Planning"));
const ChartPage = lazy(() => import("./pages/ChartPage"));

const App: React.FC = () => {
  
  const { user } = useAuth();

  return (
    <>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={user ? <MainLayout><Stores /></MainLayout> : <Navigate to="/login" />} />
            <Route path="/stores" element={user ? <MainLayout><Stores /></MainLayout> : <Navigate to="/login" />} />
            <Route path="/skus" element={user ? <MainLayout><SKUs /></MainLayout> : <Navigate to="/login" />} />
            <Route path="/planning" element={user ? <MainLayout><Planning /></MainLayout> : <Navigate to="/login" />} />
            <Route path="/chart" element={user ? <MainLayout><ChartPage /></MainLayout> : <Navigate to="/login" />} />
          </Routes>
          
        </>
  );
};

export default App;
