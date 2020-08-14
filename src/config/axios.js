import axios from 'axios';

const clienteAxios = axios.create({
    // baseURL: 'http://localhost:4000/'
    baseURL: 'http://192.168.0.9:4000/'
});

export default clienteAxios;