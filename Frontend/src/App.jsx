import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout'; // Import the new layout
import Home from './Home';
import Docs from './Docs';
import About from './About';
import Login from './LoginPage';
import Signup from './SignupPage';
import AppHeader from './components/AppHeader';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* All routes will now use the AppLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </Router>
  );
}