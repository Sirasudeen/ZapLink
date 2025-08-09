import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout'; // Import the new layout
import Home from './Pages/Home';
import Docs from './Pages/Docs';
import About from './Pages/About';
import Login from './Pages/LoginPage';
import Signup from './Pages/SignupPage';
import AppHeader from './components/AppHeader';
import DashboardPage from './Pages/Dashboard';
import AnalyticsPage from './Pages/Analytics';
import { useAuth } from './Auth/AuthContext';

const PrivateRoute = () => {
  const { user } = useAuth();
  return user ? <><AppHeader /> <Outlet /></> : <Navigate to="/login" />;
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/analytics/:shortCode" element={<AnalyticsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}