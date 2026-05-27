import React from 'react';
import { useFetch } from '../hooks/useFetch';
import VehicleCard from '../components/VehicleCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage'; // Importamos el nuevo componente

export default function VehicleList() {
  const { data: vehiculos, loading, error } = useFetch('/vehiculos');

  // Uso del componente reutilizable LoadingSpinner
  if (loading) return <LoadingSpinner message="Conectando al clúster de microservicios..." />;

  // Uso del componente reutilizable ErrorMessage
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="list-container">
      <h2 className="page-title">📋 Flota de Vehículos (Datos Reales)</h2>

      {vehiculos && vehiculos.length === 0 ? (
        <p className="no-data-text">No hay autos disponibles en la base de datos.</p>
      ) : (
        <div className="vehicle-grid">
          {vehiculos?.map(item => (
            <VehicleCard key={item.id} vehiculo={item} />
          ))}
        </div>
      )}
    </div>
  );
}