    import React, { useState } from 'react';
    import { useParams, useNavigate } from 'react-router-dom';
    import { useFetch } from '../hooks/useFetch';
    import axios from 'axios';
    import LoadingSpinner from '../components/LoadingSpinner';
    import ErrorMessage from '../components/ErrorMessage';

    export default function VehicleDetail() {
      const { id } = useParams();
      const navigate = useNavigate();
      const [procesando, setProcesando] = useState(false);
      const [respuesta, setRespuesta] = useState({ exito: '', error: '' });

      // Consumo declarativo: el componente simplemente "consume" el estado
        // El hook gestiona internamente axios, loading y errores.
      const { data: vehiculo, loading, error } = useFetch(`/vehiculos/${id}`);

      // El componente solo se encarga de reaccionar a los estados recibidos
      if (loading) return <LoadingSpinner message="Buscando datos del vehículo..." />;
      if (error) return <ErrorMessage message={error} />;
      if (!vehiculo) return <div className="card">Vehículo no encontrado.</div>;

      // Ejemplo en VehicleDetail.jsx (Manejo de flujo transaccional)
      const handleAlquilarReal = async () => {
        setProcesando(true);  // Indica al usuario que la acción está en curso
        setRespuesta({ exito: '', error: '' }); // Limpia mensajes previos

        try {
          // 1. Registro: POST al microservicio de operaciones
          await axios.post(`http://localhost:8080/api/operaciones/alquilar/${vehiculo.id}`);

          // 2. Persistencia: PUT al microservicio de vehículos para cambiar estado
          await axios.put(`http://localhost:8080/api/vehiculos/${vehiculo.id}`, {
            ...vehiculo,
            estado: 'Alquilado'
          });

          setRespuesta({ exito: '🎉 ¡Alquiler realizado con éxito!', error: '' });
          setTimeout(() => navigate('/vehiculos'), 2500);
        } catch (err) {
          setRespuesta({
            exito: '',
            error: '❌ Error al comunicarse con el clúster. Verifica que el servicio esté activo.'
          });
        } finally {
          setProcesando(false); // Garantiza que el botón se habilite nuevamente
        }
      };

      return (
        <div className="card">
          <button onClick={() => navigate('/vehiculos')} className="btn-secondary" style={{ marginBottom: '15px' }}>
            ⬅ Volver al Catálogo
          </button>

          <h2 className="page-title">🚗 Inspección de Unidad</h2>
          <hr />
          <p><strong>ID:</strong> {vehiculo.id}</p>
          <p><strong>Marca:</strong> {vehiculo.marca} </p>
          <p><strong>Modelo:</strong> {vehiculo.modelo}</p>
          <p>
            <strong>Estado Actual:</strong>
            <span className={vehiculo.estado === 'Disponible' ? 'status-green' : 'status-red'}>
              {vehiculo.estado}
            </span>
          </p>

          {/* Renderizado condicional del botón de acción */}
          {vehiculo.estado === 'Disponible' ? (
            <button
              onClick={handleAlquilarReal}
              disabled={procesando}
              className="btn-primary"
            >
              {procesando ? 'Procesando...' : 'Confirmar Alquiler Vehículo'}
            </button>
          ) : (
            <button disabled className="btn-disabled">
              Unidad No Disponible
            </button>
          )}

          {/* Mensajes de feedback */}
          {respuesta.exito && <div className="success-message">{respuesta.exito}</div>}
          {respuesta.error && <ErrorMessage message={respuesta.error} />}
        </div>
      );
    }