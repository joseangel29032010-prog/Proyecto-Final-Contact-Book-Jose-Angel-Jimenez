Este proyecto consiste en una API para gestionar contactos. Permite crear una cuenta, iniciar sesión y administrar los contactos de cada usuario.

Fue desarrollado como proyecto final del curso de Desarrollo Backend con Node.js.

¿Qué se puede hacer?

Registrar usuarios e iniciar sesión.

Crear, consultar, editar y eliminar contactos.

Organizar los contactos por categorías.

Marcar contactos como favoritos.

Consultar estadísticas.

Administrar usuarios y sus roles.

Proteger las rutas mediante autenticación y permisos.

Tecnologías

El proyecto está desarrollado con Node.js y Express. Para guardar la información utiliza PostgreSQL y Sequelize. También se utilizan JWT para la autenticación, Docker para la base de datos y Jest con Supertest para las pruebas.

Cómo ejecutar el proyecto

Primero, clona el repositorio e instala las dependencias:

git clone https://github.com/joseangel29032010-prog/Proyecto-Final-Contact-Book-Jose-Angel-Jimenez.git
cd Proyecto-Final-Contact-Book-Jose-Angel-Jimenez
npm install

Crea un archivo .env tomando como referencia .env.example y configura tus variables de entorno.

Luego inicia la base de datos:

docker compose up -d

Finalmente, inicia el servidor:

npm run dev

La API estará disponible en http://localhost:3000.

Pruebas

Para ejecutar las pruebas automatizadas:

npm test

Autor

José Ángel Jiménez

Proyecto final — Desarrollo Backend con Node.js.