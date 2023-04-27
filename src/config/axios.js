import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: 'http://192.168.10.9:3001/api'
});

export default clienteAxios;