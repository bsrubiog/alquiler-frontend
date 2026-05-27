import React from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import VehicleCard from '../components/VehicleCard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Home() {
  // Obtenemos los vehículos para mostrar algunos destacados
  const { data: vehiculos, loading } = useFetch('/vehiculos');

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <div className="card">
        <h1>🚗 Agencia de Alquiler de vehiculos</h1>
        <p>Tu viaje comienza aquí. La mejor flota de la ciudad.</p>
        <Link to="/vehiculos" className="btn-primary" style={{ display: 'inline-block', width: 'auto', padding: '10px 30px', textDecoration: 'none', marginTop: '10px' }}>
          Ver Catálogo Completo
        </Link>
      </div>

      <h2 style={{ marginTop: '40px' }}>Vehículos Destacados</h2>

      {loading ? (
        <LoadingSpinner message="Cargando flota destacada..." />
      ) : (
        <div className="vehicle-grid">
          {/* Mostramos solo los primeros 3 para no saturar el inicio */}
          {vehiculos?.slice(0, 3).map(item => (
            <VehicleCard key={item.id} vehiculo={item} />
          ))}
        </div>
      )}
    </div>
  );
}