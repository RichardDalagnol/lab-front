import axios from 'axios';

const token = localStorage.getItem('@Lamivet:token')

const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: token ? `Bearer ${token}` : ''
  }
});

export default api;
