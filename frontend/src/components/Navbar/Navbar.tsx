import React from 'react';
import { useAuthStore } from '../../context/useAuthStore';
import { useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className={styles.navbar}>
            <div className={styles.navbarContent}>
                <h1>Red Social</h1>
                <button onClick={handleLogout} className={styles.logoutBtn}>
                    Cerrar sesión
                </button>
            </div>
        </header>
    );
};

export default Navbar;
