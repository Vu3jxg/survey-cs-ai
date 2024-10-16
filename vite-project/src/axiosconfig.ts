import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://10.100.15.103:8000', // Use the actual IP of the backend server
    headers: {
        'Content-Type': 'application/json'
    }
});

export default instance;
