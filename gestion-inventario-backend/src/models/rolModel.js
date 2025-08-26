const { sql, poolPromise } = require('../config/db');

async function obtenerRoles() {
  const pool = await poolPromise;
  const result = await pool.request()
    .query('SELECT * FROM Rol');
  return result.recordset;
}

async function obtenerRolPorId(id) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('IdRol', sql.Int, id)
    .query('SELECT * FROM Rol WHERE IdRol = @IdProveedor');
  return result.recordset[0]; 
}

async function crearRol({ NombreRol }) {
  const pool = await poolPromise;
  await pool.request()
    .input('NombreRol', sql.NVarChar(100), NombreRol)
    .query(`INSERT INTO Rol (NombreRol)
            VALUES (@NombreRol)`);
}   

async function actualizarRol(id, { NombreRol }) {
  const pool = await poolPromise;
  await pool.request()
    .input('IdRol', sql.Int, id)
    .input('NombreRol', sql.NVarChar(100), NombreRol)
    .query(`UPDATE Rol
            SET NombreRol = @NombreRol
            WHERE IdRol = @IdRol`);
}

async function eliminarRol(id) {
  const pool = await poolPromise;
  await pool.request()
    .input('IdRol', sql.Int, id)
    .query(`DELETE FROM Rol WHERE IdRol = @IdRol`);
}

module.exports = {
  obtenerRoles,
  obtenerRolPorId,
  crearRol,
  actualizarRol,
  eliminarRol
};
