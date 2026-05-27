// src/components/LoadingSpinner.jsx
export default function LoadingSpinner({ message = "Cargando..." }) {
  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <div className="spinner"></div>
      <p style={{ color: '#555', fontWeight: 'bold' }}>{message}</p>
    </div>
  );
}