import axios from 'axios';

export async function createPost(mensaje: string) {
  const token = localStorage.getItem('token');
  const response = await axios.post(
    'http://localhost:3003/posts',
    { mensaje },
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    }
  );
  return response.data;
}
