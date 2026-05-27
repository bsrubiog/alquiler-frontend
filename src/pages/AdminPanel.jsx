import React, { useState } from 'react';
import axios from 'axios';
import ErrorMessage from '../components/ErrorMessage'; // 1. Importación del componente

export default function AdminPanel() {
  const [formData, setFormData] = useState({
    marca: '',
    modelo: '',
    estado: 'Disponible'
  });

  // 2. Estado para manejar el error de forma visual
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Limpiamos errores previos al intentar de nuevo

    try {
      await axios.post('http://localhost:8080/api/vehiculos', formData);
      alert('✅ Vehículo registrado exitosamente.');
      setFormData({ marca: '', modelo: '', estado: 'Disponible' });
    } catch (err) {
      // 3. Capturamos el error en el estado en lugar de usar un alert
      setError("No fue posible conectar con el servidor: " + err.message);
    }
  };

  return (
    <div className="card">
      <h2 className="page-title">Registrar Vehículo</h2>

      {/* 4. Renderizado condicional del componente de error */}
      {error && <ErrorMessage message={error} />}

      <form onSubmit={handleSubmit}>
        <input
          className="form-input"
          placeholder="Marca"
          value={formData.marca}
          onChange={e => setFormData({...formData, marca: e.target.value})}
          required
        />
        <input
          className="form-input"
          placeholder="Modelo"
          value={formData.modelo}
          onChange={e => setFormData({...formData, modelo: e.target.value})}
          required
        />

        <button type="submit" className="btn-primary">
          Guardar Vehículo
        </button>
      </form>
    </div>
  );
}