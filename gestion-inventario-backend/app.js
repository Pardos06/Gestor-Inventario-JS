require('dotenv').config();
const express = require('express');
const { swaggerUi, specs } = require('./src/config/swagger');
const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
// Rutas
const productoRoutes = require('./src/routes/productoRoutes');
const proveedorRoutes = require('./src/routes/proveedorRoutes');
const sucursalRoutes = require('./src/routes/sucursalRoute');
const inventarioRoutes = require('./src/routes/inventarioRoutes');
const movimientoInventarioRoutes = require('./src/routes/movimientoInventario');
const rolRoutes = require('./src/routes/rolRoutes');
const usuarioRoutes = require('./src/routes/usuarioRoutes');


app.use('/api/productos', productoRoutes);
app.use('/api/proveedor', proveedorRoutes);
app.use('/api/sucursales', sucursalRoutes);
app.use('/api/inventarios', inventarioRoutes);
app.use('/api/movimientos', movimientoInventarioRoutes);
app.use('/api/roles', rolRoutes);
app.use('/api/usuarios', usuarioRoutes);
// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Configuración del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

// Test de conexión a la base de datos
const { poolPromise } = require('./src/config/db');
poolPromise.then(pool => {
  return pool.request().query('SELECT 1 AS conexionExitosa');
}).then(result => {
  console.log('Consulta de prueba:', result.recordset);
}).catch(err => {
  console.error('Error en la consulta de prueba:', err);
});
