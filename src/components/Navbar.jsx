import React from 'react';
import { Link } from 'react-router-dom'; // ⬅️ ¡Esta importación es obligatoria!

export default function Navbar() {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between', // ⬅️ Corregido para separar el título de los botones
      alignItems: 'center',
      padding: '15px 30px',
      backgroundColor: '#2c3e50',
      color: 'white',
      borderRadius: '6px',
      marginBottom: '25px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ margin: 0, fontSize: '1.4rem' }}> Agencia de Alquiler de vehiculos</h2>
      <div style={{ display: 'flex', gap: '20px', marginLeft: 'auto' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Inicio</Link>
        <Link to="/vehiculos" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Ver Catálogo</Link>
        <Link to="/admin" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Administración</Link>
      </div>
    </nav>
  );
}