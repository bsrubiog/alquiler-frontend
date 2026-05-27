import { useState, useEffect } from 'react';
import axios from 'axios';

// Definición de constante global para el endpoint del servidor
const API_BASE_URL = 'http://localhost:8080/api';

export function useFetch(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}${endpoint}`);
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Error de conexión con el servidor backend');
      } finally {
        setLoading(false);
      }
    };

    if (endpoint) {
      fetchData();
    }
  }, [endpoint]);

  return { data, loading, error };
}