# 📦 Gestor de Inventario - Backend

## 🚀 Descripción

Este proyecto es el backend de una aplicación de gestión de inventario desarrollada con Node.js, Express y SQL Server. Permite a las empresas llevar un control eficiente de su inventario, gestionar usuarios y roles, y realizar auditorías de stock.

## 🧩 Características

* **Autenticación JWT**: Inicio de sesión seguro con tokens JWT.
* **Roles de usuario**: Gestión de roles como Administrador y Usuario.
* **Operaciones CRUD**: Crear, leer, actualizar y eliminar productos e inventarios.
* **Auditoría de movimientos**: Registro detallado de entradas y salidas de productos.
* **Interfaz de administración**: Dashboard intuitivo para la gestión de inventario.

## 🔧 Tecnologías

* Node.js
* Express
* SQL Server
* JWT (JSON Web Tokens)
* bcryptjs (Hashing de contraseñas)
* mssql (Conexión a SQL Server)

## 📸 Imágenes de la Aplicación

### Pantalla de Inicio de Sesión

### Dashboard de Inventario

### Aplicación Móvil

## 🛠️ Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tuusuario/gestor-inventario-backend.git
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd gestor-inventario-backend
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Configura las variables de entorno en un archivo `.env`:

   ```env
   DB_SERVER=localhost
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_DATABASE=nombre_base_datos
   JWT_SECRET=secreto_jwt
   ```

5. Inicia el servidor:

   ```bash
   npm start
   ```

## 🔐 Autenticación

Para autenticarte, realiza una solicitud POST a `/api/login` con las siguientes credenciales:

```json
{
  "correo": "usuario@ejemplo.com",
  "contrasena": "tu_contraseña"
}
```

La respuesta será un token JWT que podrás utilizar para acceder a las rutas protegidas.

## 📚 Documentación de la API

* **POST** `/api/login`: Inicia sesión y obtiene un token JWT.
* **GET** `/api/productos`: Obtiene la lista de productos.
* **POST** `/api/productos`: Crea un nuevo producto.
* **PUT** `/api/productos/{id}`: Actualiza un producto existente.
* **DELETE** `/api/productos/{id}`: Elimina un producto.

## 📈 Roadmap

*

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Añadir nueva funcionalidad'`).
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Crea un nuevo Pull Request.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.
