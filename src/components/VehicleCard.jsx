import React from 'react';
import { useNavigate } from 'react-router-dom';

// ¡ESTA PALABRA ES LA CLAVE!: "export default"
export default function VehicleCard({ vehiculo }) {
  const navigate = useNavigate();

  return (
    <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
      <h3>{vehiculo.marca} </h3>
      <h3>{vehiculo.modelo}</h3>

      <button 
        onClick={() => navigate(`/vehiculos/${vehiculo.id}`)}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#3498db',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold',
          marginTop: '10px'
        }}
      >
        Ver Detalles / Alquilar
      </button>
    </div>
  );
}