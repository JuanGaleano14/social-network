import React from 'react';
import styles from './Sidebar.module.css';

type Props = {
    onNavigate: (page: "posts" | "profile" | "newpost") => void;
};

const Sidebar: React.FC<Props> = ({ onNavigate }) => {
    return (
        <aside className={styles.sidebar}>
            <button onClick={() => onNavigate('profile')}>Perfil</button>
            <button onClick={() => onNavigate('posts')}>Publicaciones</button>
            <button onClick={() => onNavigate('newpost')}>Nueva publicación</button>
        </aside>
    );
};

export default Sidebar;
