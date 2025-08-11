const { sql, poolPromise } = require('../config/db');

async function obtenerSucursales() {
  const pool = await poolPromise;
  const result = await pool.request()
    .query('SELECT * FROM Sucursal');
  return result.recordset;
}
async function obtenerSucursalPorId(id) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('IdSucursal', sql.Int, id)
    .query('SELECT * FROM Surcursal WHERE IdSucursal = @IdSucursal');
  return result.recordset[0]; // Retorna un solo producto o undefined
}

async function crearSucursal({ NombreSucursal, Direccion}) {
  const pool = await poolPromise;
  await pool.request()
    .input('NombreSucursal', sql.NVarChar(150), NombreSucursal)
    .input('Direccion', sql.NVarChar(500), Direccion)
    .query(`INSERT INTO Sucursal (NombreSucursal, Direccion)
            VALUES (@NombreSucursal, @Direccion)`);
}

async function actualizarSucursal(id, { NombreSucursal, Direccion }) {
  const pool = await poolPromise;
  await pool.request()
    .input('IdSucursal', sql.Int, id)
    .input('NombreSucursal', sql.NVarChar(150), NombreSucursal)
    .input('Direccion', sql.NVarChar(500), Direccion)
    .query(`UPDATE Sucursal
            SET NombreSucursal = @NombreSucursal,
                Direccion = @Direccion
            WHERE IdSucursal = @IdSucursal`);
}

async function eliminarSucursal(id){
    const pool = await poolPromise;
    await pool.request()
        .input('IdSucursal', sql.Int, id)
        .query(`DELETE FROM Sucursal WHERE IdSucursal = @IdSucursal`);
}
module.exports = {
    obtenerSucursales,
    obtenerSucursalPorId,
    crearSucursal,
    actualizarSucursal,
    eliminarSucursal
};
