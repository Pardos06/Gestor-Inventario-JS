const sql = require('mssql');
const { poolPromise } = require('../config/db');

async function obtenerUsuarios() {
  const pool = await poolPromise;
  const result = await pool.request()
    .query('SELECT IdUsuario, Nombre, Apellido, Correo, IdRol, Confirmado FROM Usuario');
  return result.recordset;
}

async function obtenerUsuarioPorId(id) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('IdUsuario', sql.Int, id)
    .query('SELECT IdUsuario, Nombre, Apellido, Correo, IdRol, Confirmado FROM Usuario WHERE IdUsuario = @IdUsuario');
  return result.recordset[0];
}

async function obtenerUsuarioPorCorreo(correo) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('correo', sql.NVarChar, correo)   // <<< nota que aquí usamos "correo", no "Correo"
      .query(`
        SELECT u.*, r.NombreRol
        FROM Usuario u
        JOIN Rol r ON u.IdRol = r.IdRol
        WHERE u.Correo = @correo
      `);
    return result.recordset[0];
  } catch (error) {
    console.error('Error en obtenerUsuarioPorCorreo:', error);
    throw error;
  }
}

async function crearUsuario({ Nombre, Apellido, Correo, Contrasena, IdRol }) {
  const pool = await poolPromise;
  const hashedPassword = await bcrypt.hash(Contrasena, 10);
  // Generar token de confirmación
  const tokenConfirmacion = crypto.randomBytes(50).toString('hex');
  const expiracion = new Date(Date.now() + 24*60*60*1000); // 24 horas

  await pool.request()
    .input('Nombre', sql.NVarChar(100), Nombre)
    .input('Apellido', sql.NVarChar(100), Apellido)
    .input('Correo', sql.NVarChar(100), Correo)
    .input('Contrasena', sql.NVarChar(255), hashedPassword)
    .input('IdRol', sql.Int, IdRol)
    .input('Confirmado', sql.Bit, 0)
    .input('TokenConfirmacion', sql.NVarChar(100), tokenConfirmacion)
    .input('TokenConfirmacionExpiracion', sql.DateTime, expiracion)
    .query(`INSERT INTO Usuario 
      (Nombre, Apellido, Correo, Contrasena, IdRol, Confirmado, TokenConfirmacion, TokenConfirmacionExpiracion)
      VALUES 
      (@Nombre, @Apellido, @Correo, @Contrasena, @IdRol, @Confirmado, @TokenConfirmacion, @TokenConfirmacionExpiracion)`);

  return { tokenConfirmacion, expiracion };
}

async function confirmarUsuario(token) {
  const pool = await poolPromise;

  console.log('Token recibido para confirmar:', token);

  const usuario = await pool.request()
    .input('TokenConfirmacion', sql.NVarChar(100), token.trim())
    .query(`SELECT * FROM Usuario 
            WHERE TokenConfirmacion = @TokenConfirmacion 
            AND TokenConfirmacionExpiracion > GETDATE()
            AND Confirmado = 0`);

  console.log('Resultado consulta confirmar usuario:', usuario.recordset);

  if (!usuario.recordset.length) return false;

  await pool.request()
    .input('TokenConfirmacion', sql.NVarChar(100), token.trim())
    .query(`UPDATE Usuario SET Confirmado = 1, TokenConfirmacion = NULL, TokenConfirmacionExpiracion = NULL 
            WHERE TokenConfirmacion = @TokenConfirmacion`);

  return true;
}

async function actualizarUsuario(id, { Nombre, Apellido, Correo, IdRol, Confirmado }) {
  const pool = await poolPromise;
  await pool.request()
    .input('IdUsuario', sql.Int, id)
    .input('Nombre', sql.NVarChar(100), Nombre)
    .input('Apellido', sql.NVarChar(100), Apellido)
    .input('Correo', sql.NVarChar(100), Correo)
    .input('IdRol', sql.Int, IdRol)
    .input('Confirmado', sql.Bit, Confirmado)
    .query(`UPDATE Usuario SET 
      Nombre = @Nombre,
      Apellido = @Apellido,
      Correo = @Correo,
      IdRol = @IdRol,
      Confirmado = @Confirmado
      WHERE IdUsuario = @IdUsuario`);
}

async function eliminarUsuario(id) {
  const pool = await poolPromise;
  await pool.request()
    .input('IdUsuario', sql.Int, id)
    .query(`DELETE FROM Usuario WHERE IdUsuario = @IdUsuario`);
}

async function cambiarContrasena(id, nuevaContrasena) {
  const pool = await poolPromise;
  const hashedPassword = await bcrypt.hash(nuevaContrasena, 10);
  await pool.request()
    .input('IdUsuario', sql.Int, id)
    .input('Contrasena', sql.NVarChar(255), hashedPassword)
    .query(`UPDATE Usuario SET Contrasena = @Contrasena WHERE IdUsuario = @IdUsuario`);
}
async function guardarTokenRecuperacion(idUsuario, token, expiracion) {
  const pool = await poolPromise;
  await pool.request()
    .input('IdUsuario', sql.Int, idUsuario)
    .input('TokenRecuperacion', sql.NVarChar(100), token)
    .input('TokenRecuperacionExpiracion', sql.DateTime, expiracion)
    .query(`UPDATE Usuario SET TokenRecuperacion = @TokenRecuperacion, TokenRecuperacionExpiracion = @TokenRecuperacionExpiracion WHERE IdUsuario = @IdUsuario`);
}

async function obtenerUsuarioPorTokenRecuperacion(token) {
  const pool = await poolPromise;
  const now = new Date();
  const result = await pool.request()
    .input('TokenRecuperacion', sql.NVarChar(100), token)
    .input('Now', sql.DateTime, now)
    .query(`SELECT * FROM Usuario WHERE TokenRecuperacion = @TokenRecuperacion AND TokenRecuperacionExpiracion > @Now`);
  return result.recordset[0];
}

async function actualizarContrasenaPorToken(idUsuario, nuevaContrasena) {
  const pool = await poolPromise;
  const hashedPassword = await bcrypt.hash(nuevaContrasena, 10);
  await pool.request()
    .input('IdUsuario', sql.Int, idUsuario)
    .input('Contrasena', sql.NVarChar(255), hashedPassword)
    .input('TokenRecuperacion', sql.NVarChar(100), null)
    .input('TokenRecuperacionExpiracion', sql.DateTime, null)
    .query(`UPDATE Usuario SET Contrasena = @Contrasena, TokenRecuperacion = @TokenRecuperacion, TokenRecuperacionExpiracion = @TokenRecuperacionExpiracion WHERE IdUsuario = @IdUsuario`);
}
module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  obtenerUsuarioPorCorreo,
  crearUsuario,
  confirmarUsuario,
  actualizarUsuario,
  eliminarUsuario,
  cambiarContrasena,
  guardarTokenRecuperacion,
  obtenerUsuarioPorTokenRecuperacion,
    actualizarContrasenaPorToken
};
