// Axios é um cliente HTTP que pode se comunicar com o back-end.
import axios from 'axios';

// Cria uma Api com o Axios.
const api = axios.create({
  baseURL: 'http://localhost:3333'
});

// Exporta a Api.
export default api;