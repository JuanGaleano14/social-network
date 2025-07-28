import axios from 'axios'
import {useAuthStore} from '../context/useAuthStore'

const instance = axios.create({
    baseURL: 'http://localhost:3001',
})

instance.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

export default instance