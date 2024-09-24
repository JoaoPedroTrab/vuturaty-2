// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import PreviewPage from './pages/PreviewPage';
import Teste from './pages/Teste';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <div className="relative w-full min-h-screen bg-neutral-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/preview" element={<PreviewPage />} />
          <Route path="/teste" element={<Teste /> } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;