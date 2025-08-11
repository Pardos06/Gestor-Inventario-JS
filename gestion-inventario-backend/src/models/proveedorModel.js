const { sql, poolPromise } = require('../config/db');

async function obtenerProveedores() {
  const pool = await poolPromise;
  const result = await pool.request()
    .query('SELECT * FROM Proveedor');
  return result.recordset;
}

async function obtenerProveedorPorId(id) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('IdProveedor', sql.Int, id)
    .query('SELECT * FROM Proveedor WHERE IdProveedor = @IdProveedor');
  return result.recordset[0]; // un solo registro
}

async function crearProveedor({ NombreProveedor, Contacto, Telefono, Correo }) {
  const pool = await poolPromise;
  await pool.request()
    .input('NombreProveedor', sql.NVarChar(100), NombreProveedor)
    .input('Contacto', sql.NVarChar(100), Contacto)
    .input('Telefono', sql.NVarChar(20), Telefono)
    .input('Correo', sql.NVarChar(100), Correo)
    .query(`INSERT INTO Proveedor (NombreProveedor, Contacto, Telefono, Correo)
            VALUES (@NombreProveedor, @Contacto, @Telefono, @Correo)`);
}

async function actualizarProveedor(id, { NombreProveedor, Contacto, Telefono, Correo }) {
  const pool = await poolPromise;
  await pool.request()
    .input('IdProveedor', sql.Int, id)
    .input('NombreProveedor', sql.NVarChar(100), NombreProveedor)
    .input('Contacto', sql.NVarChar(100), Contacto)
    .input('Telefono', sql.NVarChar(20), Telefono)
    .input('Correo', sql.NVarChar(100), Correo)
    .query(`UPDATE Proveedor
            SET NombreProveedor = @NombreProveedor,
                Contacto = @Contacto,
                Telefono = @Telefono,
                Correo = @Correo
            WHERE IdProveedor = @IdProveedor`);
}

async function eliminarProveedor(id) {
  const pool = await poolPromise;
  await pool.request()
    .input('IdProveedor', sql.Int, id)
    .query(`DELETE FROM Proveedor WHERE IdProveedor = @IdProveedor`);
}

module.exports = {
  obtenerProveedores,
  obtenerProveedorPorId,
  crearProveedor,
  actualizarProveedor,
  eliminarProveedor
};
