import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styles from './Dashboard.module.css';
import Navbar from '../components/Navbar/Navbar';
import PostCard from '../components/Postcard/PostCard';
import Sidebar from "../components/Sidebar/Sidebar.tsx";
import UserProfile from '../components/UserProfile/UserProfile.tsx';

const Dashboard: React.FC = () => {
    const [posts, setPosts] = useState([]);
    const [view, setView] = useState<'posts' | 'profile' | 'newpost'>('posts');
    const [mensaje, setMensaje] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const token = localStorage.getItem('token') || '';

    useEffect(() => {
        if (view === 'posts') {
            axios
                .get('http://localhost:3003/posts', {
                    headers: {Authorization: `Bearer ${token}`},
                })
                .then((res) => setPosts(res.data))
                .catch((err) => console.error(err));
        }
    }, [view]);

    const handleCreatePost = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            // Importación dinámica para evitar hook en render
            const { createPost } = await import('../services/postService');
            await createPost(mensaje);
            setMensaje('');
            setSuccess(true);
            setView('posts');
        } catch (err: any) {
            setError(err.message || 'Error al crear la publicación');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar/>
            <div className={styles.container}>
                <Sidebar onNavigate={setView}/>
                <main className={styles.main}>
                    {view === 'posts' ? (
                        posts.map((post: any) => (
                            <PostCard key={post.id} post={post} token={token}/>
                        ))
                    ) : view === 'profile' ? (
                        <UserProfile token={token}/>
                    ) : (
                        <form onSubmit={handleCreatePost} style={{maxWidth: 500, margin: '2rem auto', display: 'flex', flexDirection: 'column', gap: '1.2rem', background: '#fff', padding: '2rem', borderRadius: 12, boxShadow: '0 2px 12px 0 rgba(0,0,0,0.04)', fontFamily: `'Segoe UI', 'Roboto', Arial, sans-serif`}}>
                            <h2 style={{textAlign: 'center', fontWeight: 500, color: '#222', fontFamily: 'inherit'}}>Nueva publicación</h2>
                            <textarea
                                value={mensaje}
                                onChange={e => setMensaje(e.target.value)}
                                placeholder="¿Qué estás pensando?"
                                required
                                rows={4}
                                style={{resize: 'none', padding: '1rem', borderRadius: 7, border: '1px solid #e0e0e0', fontSize: '1rem', fontFamily: 'inherit'}}
                            />
                            {error && <div style={{color: '#d32f2f', textAlign: 'center', fontFamily: 'inherit'}}>{error}</div>}
                            {success && <div style={{color: '#388e3c', textAlign: 'center', fontFamily: 'inherit'}}>¡Publicación creada!</div>}
                            <button type="submit" disabled={loading} style={{padding: '0.7rem 1rem', borderRadius: 7, border: 'none', background: '#222', color: '#fff', fontWeight: 500, fontSize: '1rem', cursor: 'pointer', transition: 'background 0.2s', fontFamily: 'inherit'}}>
                                {loading ? 'Creando...' : 'Publicar'}
                            </button>
                        </form>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
