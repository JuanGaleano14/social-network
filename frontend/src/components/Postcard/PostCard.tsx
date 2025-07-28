import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styles from './PostCard.module.css';

type Post = {
    id: string;
    mensaje: string;
    fecha_publicacion: string;
};

type Props = {
    post: Post;
    token: string;
};

const PostCard: React.FC<Props> = ({post, token}) => {
    const [likes, setLikes] = useState<number>(0);

    useEffect(() => {
        axios
            .get(`http://localhost:3003/posts/${post.id}/likes`, {
                headers: {Authorization: `Bearer ${token}`},
            })
            .then((res) => setLikes(res.data.length))
            .catch((err) => console.error(err));
    }, [post.id]);

    const handleLike = async () => {
        try {
            await axios.post(
                `http://localhost:3003/posts/${post.id}/like`,
                {},
                {headers: {Authorization: `Bearer ${token}`}}
            );
            setLikes((prev) => prev + 1);
        } catch (error) {
            console.error('Error al dar like:', error);
        }
    };

    return (
        <div className={styles.card}>
            <p>{post.mensaje}</p>
            <small>{new Date(post.fecha_publicacion).toLocaleString()}</small>
            <button onClick={handleLike}>❤️ {likes}</button>
        </div>
    );
};

export default PostCard;
