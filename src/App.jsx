import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // 1. Importa el componente
import Home from './pages/Home';
import VehicleList from './pages/VehicleList';
import VehicleDetail from './pages/VehicleDetail';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <Router>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh', // Asegura que el footer se mantenga al final
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
      }}>

        {/* Navbar fijo arriba */}
        <Navbar />

        {/* Contenido principal con margen superior e inferior */}
        <main style={{ flex: 1, padding: '20px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vehiculos" element={<VehicleList />} />
            <Route path="/vehiculos/:id" element={<VehicleDetail />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>

        {/* Footer fijo abajo */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
