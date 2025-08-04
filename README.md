# Microservicio de Usuarios

Microservicio para registro y recuperación de usuarios con pregunta de seguridad usando MongoDB Atlas.

## Características

- Registro de usuarios con contraseña y pregunta de seguridad.
- Recuperación de contraseña mediante pregunta de seguridad.
- Contraseñas y respuestas de seguridad almacenadas de forma segura (hash).
- API REST construida con Express y MongoDB (Mongoose).

## Instalación

1. Clona el repositorio:
   ```sh
   git clone <URL-del-repositorio>
   cd microservicio-usuarios
   ```

2. Instala las dependencias:
   ```sh
   npm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto y agrega tu cadena de conexión de MongoDB Atlas:
   ```
   MONGODB_URI=<tu_cadena_de_conexion>
   PORT=3000
   ```

## Uso

- Inicia el servidor en modo desarrollo:
  ```sh
  npm run dev
  ```
- O en modo producción:
  ```sh
  npm start
  ```

El servidor estará disponible en `http://localhost:3000`.

## Endpoints

- `POST /api/auth/register`  
  Registra un nuevo usuario.  
  **Body:**  
  ```json
  {
    "username": "usuario",
    "password": "contraseña",
    "securityQuestion": "¿Pregunta?",
    "securityAnswer": "respuesta"
  }
  ```

- `POST /api/auth/get-security-question`  
  Obtiene la pregunta de seguridad de un usuario.  
  **Body:**  
  ```json
  {
    "username": "usuario"
  }
  ```

- `POST /api/auth/forgot-password`  
  Recupera la contraseña mediante la respuesta de seguridad.  
  **Body:**  
  ```json
  {
    "username": "usuario",
    "securityAnswer": "respuesta",
    "newPassword": "nuevaContraseña"
  }
  ```

## Estructura del Proyecto

- [`server.js`](server.js): Punto de entrada del servidor.
- [`models/User.js`](models/User.js): Modelo de usuario (Mongoose).
- [`routes/auth.js`](routes/auth.js): Rutas de autenticación.

##