# 📦 Gestión de Inventario - Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge\&logo=node.js\&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge\&logo=express\&logoColor=white) ![SQL Server](https://img.shields.io/badge/SQL%20Server-CC2927?style=for-the-badge\&logo=microsoft-sql-server\&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge\&logo=json-web-tokens\&logoColor=white)

¡Bienvenido al backend del sistema de **Gestión de Inventario**! Este proyecto está desarrollado con Node.js, Express y SQL Server, e integra autenticación con JWT, gestión de roles y correo electrónico para recuperación y confirmación de cuentas.

---

## 🔍 Descripción del Proyecto

Este backend permite:

* Registro, confirmación y autenticación de usuarios.
* Recuperación y restablecimiento de contraseñas.
* Gestión de roles y permisos (Gerente General, Encargado de Almacén, Empleado de Tienda).
* Obtención, actualización y eliminación de usuarios según permisos.
* Integración con SQL Server para almacenamiento seguro de información.
* Seguridad basada en JWT y validaciones con express-validator.

![Workflow](https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif)

---

## ⚙️ Tecnologías Utilizadas

* **Backend:** Node.js + Express
* **Base de Datos:** SQL Server
* **Autenticación:** JWT
* **Validaciones:** express-validator
* **Envío de correos:** Nodemailer (Gmail)
* **Gestión de contraseñas:** bcrypt
* **Variables de entorno:** dotenv

---

## 🗂 Estructura del Proyecto

```
gestion-inventario-backend/
├─ src/
│  ├─ controllers/       # Lógica de los endpoints
│  ├─ middlewares/       # Middleware de auth, roles y validación
│  ├─ models/            # Modelos y consultas SQL
│  ├─ routes/            # Definición de rutas de usuarios
│  └─ services/          # Servicio de envío de correos
├─ .env                  # Variables de entorno
├─ package.json          # Dependencias y scripts
└─ README.md
```

---

## 📝 Instalación y Configuración

1. Clonar el repositorio:

```bash
git clone https://github.com/tu-usuario/gestion-inventario-backend.git
cd gestion-inventario-backend
```

2. Instalar dependencias:

```bash
npm install
```

3. Crear archivo `.env` en la raíz con el siguiente contenido:

```env
DB_USER=gestion_user
DB_PASS=123456789
DB_SERVER=localhost
DB_NAME=GestionInventario
PORT=3000

JWT_SECRET=Universidad2025
JWT_EXPIRATION=8h

EMAIL_SERVICE=gmail
EMAIL_USER=vitoroy06@gmail.com
EMAIL_PASS=tu_contraseña
EMAIL_FROM='Gestion Inventario <vitoroy06@gmail.com>'
FRONTEND_URL=http://localhost:3000

TOKEN_EXPIRATION_RECOVERY=1h
TOKEN_EXPIRATION_CONFIRM=24h
```

4. Asegúrate de tener la base de datos y las tablas creadas:

```sql
CREATE TABLE Rol (
  IdRol INT PRIMARY KEY IDENTITY(1,1),
  NombreRol NVARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE Usuarios (
  IdUsuario INT PRIMARY KEY IDENTITY(1,1),
  Nombre NVARCHAR(100),
  Apellido NVARCHAR(100),
  Correo NVARCHAR(100) UNIQUE,
  Contrasena NVARCHAR(255),
  IdRol INT FOREIGN KEY REFERENCES Rol(IdRol),
  Confirmado BIT DEFAULT 0,
  TokenConfirmacion NVARCHAR(255) NULL,
  TokenRecuperacion NVARCHAR(255) NULL,
  ExpiracionToken DATETIME NULL
);
```

5. Iniciar servidor:

```bash
npm start
```

Servidor corriendo en: `http://localhost:3000`

---

## 🚀 Uso de la API

### Autenticación

* **Registro:** `POST /usuarios/registro`
* **Confirmación de cuenta:** `GET /usuarios/confirmar/:token`
* **Login:** `POST /usuarios/login`
* **Recuperar contraseña:** `POST /usuarios/recuperar`
* **Restablecer contraseña:** `POST /usuarios/restablecer/:token`

### Gestión de Usuarios

* **Obtener todos los usuarios:** `GET /usuarios` *(solo Gerente General)*
* **Obtener usuario por ID:** `GET /usuarios/:id`
* **Actualizar usuario:** `PUT /usuarios/:id`
* **Eliminar usuario:** `DELETE /usuarios/:id`
* **Cambiar contraseña:** `PUT /usuarios/cambiar-contrasena/:id`

> 🔐 Todas las rutas críticas requieren token JWT en el header:
>
> ```
> Authorization: Bearer <TU_TOKEN>
> ```

![API](https://media.giphy.com/media/l41lXQx6PPzOeO7Es/giphy.gif)

---

## 🔒 Seguridad

* Los usuarios deben confirmar su correo para activar la cuenta.
* Contraseñas encriptadas con **bcrypt**.
* Validaciones estrictas de datos con **express-validator**.
* Control de acceso mediante **roles** definidos en el JWT.

---

## 📫 Contacto

* **Desarrollador:** Roy Vito
* **Email:** [vitoroy06@gmail.com](mailto:vitoroy06@gmail.com)
* **Proyecto:** [GitHub Repository](https://github.com/tu-usuario/gestion-inventario-backend)

---

## 🌟 Notas

* Proyecto diseñado para **entornos de aprendizaje y pruebas locales**.
* Puedes integrar con un frontend en React o Angular usando el token JWT para autenticación.
* Asegúrate de configurar correctamente las tablas y roles antes de probar los endpoints.

![End](https://media.giphy.com/media/3o7qDEq2bMbcbPRQ2c/giphy.gif)
