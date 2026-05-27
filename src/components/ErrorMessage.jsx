// src/components/ErrorMessage.jsx
export default function ErrorMessage({ message }) {
  return (
    <div className="card" style={{ textAlign: 'center', borderColor: '#e74c3c' }}>
      <h3 style={{ color: '#e74c3c' }}>⚠️ Error de conexión</h3>
      <p>{message || "Ocurrió un problema inesperado. Por favor, intenta más tarde."}</p>
    </div>
  );
}