import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.66.201.77:5016',
  timeout: 5000, // Thời gian chờ
  headers: { 'Content-Type': 'application/json' },
});

export default api;