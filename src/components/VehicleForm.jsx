import React, { useState } from 'react';
import axios from 'axios';

export default function VehicleForm() {
  const [form, setForm] = useState({ marca: '', modelo: '', anio: '', placa: '', precioDia: '', estado: 'Disponible' });
  const [status, setStatus] = useState({ success: false, error: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envía el nuevo carro por POST directo al microservicio en IntelliJ
      await axios.post('http://localhost:8080/api/vehiculos', form);
      setStatus({ success: true, error: '' });
      setForm({ marca: '', modelo: '', anio: '', placa: '', precioDia: '', estado: 'Disponible' }); // Limpia formulario
    } catch (err) {
      setStatus({ success: false, error: err.message || 'Error al guardar el vehículo' });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
      <h3>📝 Registrar Nuevo Vehículo</h3>

      <input type="text" name="marca" placeholder="Marca (Ej: Toyota)" value={form.marca} onChange={handleChange} required style={{ padding: '8px' }} />
      <input type="text" name="modelo" placeholder="Modelo (Ej: Corolla)" value={form.modelo} onChange={handleChange} required style={{ padding: '8px' }} />
      <input type="number" name="anio" placeholder="Año (Ej: 2024)" value={form.anio} onChange={handleChange} required style={{ padding: '8px' }} />
      <input type="text" name="placa" placeholder="Placa (Ej: ABC-123)" value={form.placa} onChange={handleChange} required style={{ padding: '8px' }} />
      <input type="number" name="precioDia" placeholder="Precio por Día ($)" value={form.precioDia} onChange={handleChange} required style={{ padding: '8px' }} />

      <select name="estado" value={form.estado} onChange={handleChange} style={{ padding: '8px' }}>
        <option value="Disponible">Disponible</option>
        <option value="Alquilado">Alquilado</option>
      </select>

      <button type="submit" style={{ padding: '10px', backgroundColor: '#2c3e50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
        Guardar en Base de Datos
      </button>

      {status.success && <p style={{ color: 'green', fontWeight: 'bold' }}>✔ ¡Vehículo guardado exitosamente en IntelliJ!</p>}
      {status.error && <p style={{ color: 'red', fontWeight: 'bold' }}>❌ Error: {status.error}</p>}
    </form>
  );
}