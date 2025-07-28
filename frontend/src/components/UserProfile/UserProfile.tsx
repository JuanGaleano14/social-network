import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styles from './UserProfile.module.css';

const UserProfile: React.FC<{ token: string }> = ({token}) => {
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        axios
            .get('http://localhost:3002/users/profile', {
                headers: {Authorization: `Bearer ${token}`},
            })
            .then((res) => setProfile(res.data))
            .catch((err) => console.error(err));
    }, [token]);

    if (!profile) return <p>Cargando perfil...</p>;

    return (
        <div className={styles.profileContainer}>
            <h2>Perfil del Usuario</h2>
            <p><strong>Nombre:</strong> {profile.nombres} {profile.apellidos}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Alias:</strong> {profile.alias}</p>
            <p><strong>Fecha de nacimiento:</strong> {profile.fecha_nacimiento}</p>
        </div>
    );
};

export default UserProfile;