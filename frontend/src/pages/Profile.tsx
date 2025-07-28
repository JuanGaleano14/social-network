import {useEffect, useState} from 'react';

type Usuario = {
    id: string;
    nombres: string;
    apellidos: string;
    fecha_nacimiento: string;
    alias: string;
    email: string;
    created_at: string;
};

export function Profile() {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');

            const res = await fetch('http://localhost:3002/users/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (res.ok) {
                const data = await res.json();
                setUsuario(data);
            } else {
                console.error('No se pudo cargar el perfil');
            }

            setLoading(false);
        };

        fetchProfile();
    }, []);

    if (loading) return <p>Cargando perfil...</p>;
    if (!usuario) return <p>No se pudo cargar la información del usuario.</p>;

    return (
        <div>
            <h2>Perfil del Usuario</h2>
            <ul>
                <li><strong>Nombres:</strong> {usuario.nombres}</li>
                <li><strong>Apellidos:</strong> {usuario.apellidos}</li>
                <li><strong>Alias:</strong> {usuario.alias}</li>
                <li><strong>Email:</strong> {usuario.email}</li>
                <li><strong>Fecha de Nacimiento:</strong> {new Date(usuario.fecha_nacimiento).toLocaleDateString()}</li>
                <li><strong>Registrado desde:</strong> {new Date(usuario.created_at).toLocaleString()}</li>
            </ul>
        </div>
    );
}
