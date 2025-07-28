import {useState} from 'react';
import styles from './LoginForm.module.css';
import {useAuthStore} from "../../context/authStore.ts";
import { login } from '../../services/authService.ts';

export default function LoginForm() {
    const setAuth = useAuthStore((state) => state.setAuth);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = await login(email, password);
            setAuth(data.access_token, data.alias);
            localStorage.setItem('token', data.access_token);
            window.location.href = '/dashboard';
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h2>Iniciar Sesión</h2>
            {error && <p className={styles.error}>{error}</p>}
            <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Ingresar</button>
        </form>
    );
}
