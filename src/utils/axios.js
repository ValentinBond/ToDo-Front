import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API
});

instance.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;

export default instance;