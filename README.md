# Social Network - Microservicios y Frontend

## Descripción

Este proyecto es una red social construida con arquitectura de microservicios usando NestJS para el backend y React + Vite para el frontend. Incluye autenticación JWT, gestión de usuarios, publicaciones y likes, todo orquestado con Docker Compose.

## Estructura del Proyecto

```
repo-social-network/
│
├── auth-service/        # Microservicio de autenticación y usuarios
├── users-service/       # Microservicio de gestión de usuarios
├── posts-service/       # Microservicio de publicaciones y likes
├── frontend/            # Aplicación frontend (React + Vite)
├── docker-compose.yml   # Orquestación de servicios
└── README.md            # Documentación del proyecto
```

### Estructura de cada microservicio
- `src/` Código fuente (controladores, servicios, módulos, entidades)
- `Dockerfile` Imagen para despliegue
- `package.json` Dependencias y scripts
- `tsconfig*.json` Configuración TypeScript

### Estructura del frontend
- `src/pages/` Páginas principales (Dashboard, Login, Profile)
- `src/components/` Componentes reutilizables (Navbar, Sidebar, PostCard, etc.)
- `src/context/` Estado global (authStore)
- `src/services/` Servicios para consumir APIs
- `src/api/` Configuración de Axios
- `src/routes/` Definición de rutas

## Flujo Funcional

1. **Autenticación:**
   - El usuario inicia sesión en el frontend.
   - El frontend envía las credenciales al microservicio `auth-service`.
   - Si son válidas, recibe un token JWT que se almacena en el frontend.

2. **Consumo de microservicios:**
   - El frontend usa el token JWT en la cabecera Authorization para consumir los endpoints protegidos de `users-service` y `posts-service`.
   - Los microservicios validan el token antes de responder.

3. **Publicaciones y likes:**
   - Los usuarios pueden crear publicaciones y dar/quitar likes desde el frontend.
   - Las acciones se reflejan en el microservicio `posts-service`.

4. **Gestión de usuarios:**
   - El microservicio `users-service` gestiona la información de los usuarios y responde a las consultas del frontend.

## Despliegue

1. Clona el repositorio y navega a la carpeta raíz.
2. Ejecuta:
   ```sh
   docker-compose up --build
   ```
3. El frontend estará disponible en [http://localhost:4173](http://localhost:4173)
4. Los microservicios estarán disponibles en los puertos 3001 (auth), 3002 (users), 3003 (posts).

## Datos de prueba y pasos de prueba

### Usuarios de prueba
Al iniciar los microservicios, los seeders crean automáticamente los siguientes usuarios:

- **Usuario 1**
  - Email: juan@example.com
  - Contraseña: 123456
  - Alias: juanp
- **Usuario 2**
  - Email: maria@example.com
  - Contraseña: 123456
  - Alias: marial

### Publicaciones de prueba
Al iniciar el microservicio de posts, si existen usuarios, se crea automáticamente una publicación para cada usuario:
- Mensaje: `¡Hola! Soy [alias] y esta es mi primera publicación.`

### Pasos de prueba
1. Ingresa a [http://localhost:4173](http://localhost:4173)
2. Inicia sesión con uno de los usuarios de prueba (por ejemplo, juan@example.com / 123456).
3. Visualiza las publicaciones iniciales en la sección "Publicaciones".
4. Crea una nueva publicación desde la opción "Nueva publicación" en el sidebar.
5. Cambia entre las vistas de "Perfil" y "Publicaciones" usando el sidebar.
6. Prueba el cierre de sesión con el botón en la barra superior y vuelve a iniciar sesión con otro usuario.

---

Si tienes dudas sobre la estructura o el flujo, revisa este README o consulta los archivos fuente.
