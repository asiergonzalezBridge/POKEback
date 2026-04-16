🧩 Proyecto Backend – Plataforma de Juegos y Tienda Pokémon
📌 Descripción

Este proyecto consiste en el desarrollo del backend de una plataforma donde los usuarios podrán:

Registrarse e iniciar sesión
Gestionar su perfil
Participar en juegos (PvE o PvP)
Comprar y gestionar elementos dentro de una tienda (módulo actual en desarrollo)

La tienda es solo una parte de un sistema más grande, donde la lógica principal gira en torno a la interacción entre usuarios, sus recursos y mecánicas de juego.

🎯 Objetivo del Proyecto

El objetivo principal es demostrar dominio de:

Desarrollo backend con Node.js
Diseño de APIs REST
Uso de bases de datos relacionales (PostgreSQL)
Buenas prácticas (estructura, seguridad, organización)

Siguiendo el enfoque de:

"Menos es más, si está bien hecho"

🧱 Estado actual del proyecto

Actualmente el proyecto se encuentra en la siguiente fase:

✔ Base de datos diseñada

Se han creado las tablas principales:

users
pokemon
(y futuras relaciones para tienda y lógica del juego)
✔ Modelo inicial de usuarios

Incluye:

username
email
password (temporalmente sin hash, en práctica)
tipo de Pokémon
monedas
✔ Decisiones técnicas iniciales
Base de datos: PostgreSQL
Contenedorización: Docker (en planificación)
Backend: Node.js + Express (en desarrollo)
Control de versiones: Git (recomendado iniciar ahora)
🧠 Concepto del sistema

La aplicación no es solo una tienda, sino una plataforma con:

🎮 Sistema de juego
PvE (usuario contra entorno)
PvP (usuario contra usuario)
Sistema de progreso (futuro)
🛒 Sistema de tienda
Compra de Pokémon u objetos
Uso de monedas internas
Relación directa con el progreso del usuario
🧩 Arquitectura prevista

El backend seguirá una arquitectura basada en:

API REST
Patrón MVC (Modelo - Vista - Controlador)

Estructura prevista:

src/
├── controllers/
├── models/
├── routes/
├── services/ (opcional más adelante)
├── middlewares/
└── index.js
🔌 API (en desarrollo)

Ejemplo de endpoints futuros:

Usuarios
POST /api/auth/register
POST /api/auth/login
GET /api/users/:id
Pokémon
GET /api/pokemon
POST /api/pokemon
Tienda
GET /api/shop
POST /api/shop/buy
🐳 Uso de Docker (siguiente paso)

Se planea usar Docker para:

Unificar el entorno de desarrollo
Tener la misma base de datos en todos los equipos

Cada miembro del equipo podrá levantar el proyecto con:

docker-compose up
📂 Control de versiones

Se recomienda usar Git desde este punto:

✔ Incluir en el repositorio:
Código fuente
package.json
docker-compose.yml
README.md
❌ Añadir al .gitignore:
node_modules/
.env

Esto es importante porque:

node_modules se genera automáticamente
.env contiene datos sensibles (contraseñas, claves)
🔐 Seguridad (futuro)

Se implementará:

Hash de contraseñas con bcrypt
Autenticación con JWT
Sistema de roles (admin / user)
📊 Requisitos cumplidos (parcial)

✔ Uso de base de datos
✔ Diseño inicial de relaciones
✔ Estructura backend iniciada

Pendiente:

Autenticación completa
Endpoints funcionales
Lógica de negocio
Documentación final
🚀 Próximos pasos
Crear repositorio en GitHub
Configurar Docker para PostgreSQL
Crear servidor Express básico
Conectar backend con la base de datos
Implementar endpoints CRUD
Añadir autenticación
👥 Trabajo en equipo

El proyecto se desarrolla en grupo, dividiendo tareas como:

Backend (API y lógica)
Base de datos
Documentación
Testing
📝 Notas

Este proyecto prioriza:

Código limpio
Buen diseño
Seguridad básica
Funcionalidad real

Por encima de:

Complejidad innecesaria
Features sin terminar