# Contact Book API

Contact Book es una API REST que permite gestionar contactos personales de forma organizada. Cada usuario puede tener su propia lista de contactos, clasificarlos por categorías y marcar sus favoritos.

El proyecto cuenta con un sistema de autenticación y diferentes niveles de permisos para controlar las acciones que puede realizar cada usuario.

Fue desarrollado como proyecto final del curso **Desarrollo Backend con Node.js**, aplicando los conocimientos adquiridos durante el curso.

## Funcionalidades

- Registro de usuarios e inicio de sesión.
- Autenticación mediante JWT.
- Contraseñas protegidas con bcrypt.
- Creación, consulta, edición y eliminación de contactos.
- Organización de contactos por categorías.
- Gestión de contactos favoritos.
- Estadísticas de contactos.
- Administración de usuarios y modificación de roles.
- Protección de rutas según los permisos del usuario.
- Validación de datos y manejo de errores.
- Conexión con PostgreSQL.

## Instalación

Clona el repositorio:

```bash
git clone https://github.com/joseangel29032010-prog/Proyecto-Final-Contact-Book-Jose-Angel-Jimenez.git
```

Entra en la carpeta del proyecto:

```bash
cd Proyecto-Final-Contact-Book-Jose-Angel-Jimenez
```

Instala las dependencias:

```bash
npm install
```

## Configuración

Crea un archivo `.env` en la raíz del proyecto, tomando como referencia el archivo `.env.example`.

Configura las siguientes variables:

```env
PORT=3000
JWT_SECRET=tu_secreto_jwt
JWT_EXPIRES_IN=1h

ADMIN_EMAIL=admin@contactbook.com
ADMIN_PASSWORD=tu_contrasena

DB_HOST=127.0.0.1
DB_PORT=5433
DB_NAME=contactbook
DB_USER=postgres
DB_PASSWORD=tu_contrasena
```

Utiliza tus propias credenciales y no compartas el archivo `.env`.

## Ejecutar el proyecto

Inicia PostgreSQL mediante Docker:

```bash
docker compose up -d
```

Inicia el servidor en modo desarrollo:

```bash
npm run dev
```

También puedes iniciarlo normalmente con:

```bash
npm start
```

La API estará disponible en:

`http://localhost:3000`

## Principales rutas

**Autenticación**
- `POST /auth/register` — Registrar un usuario.
- `POST /auth/login` — Iniciar sesión.
- `GET /auth/me` — Consultar el usuario autenticado.

**Contactos**
- `GET /contacts` — Obtener los contactos.
- `GET /contacts/:id` — Consultar un contacto.
- `POST /contacts` — Crear un contacto.
- `PUT /contacts