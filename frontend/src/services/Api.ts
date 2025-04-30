import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function getAllData<T>(endpoint: string): Promise<T | null> {
  try {
    const response = await api.get<T>(`/${endpoint}/`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar os dados:', error);
    return null;
  }
}

export default api;
