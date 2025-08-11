const { sql, poolPromise } = require('../config/db');

async function obtenerInventarios() {
  const pool = await poolPromise;
  const result = await pool.request()
    .query('SELECT * FROM Inventario');
  return result.recordset;
}

async function obtenerInventarioPorId(id) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('IdInventario', sql.Int, id)
    .query('SELECT * FROM Inventario WHERE IdInventario = @IdInventario');
  return result.recordset[0];
}

async function crearInventario({ IdProducto, IdSucursal,Cantidad, Estado, Observaciones }) {
  const pool = await poolPromise;
  await pool.request()
    .input('IdProducto', sql.Int, IdProducto)
    .input('IdSucursal', sql.Int, IdSucursal)
    .input('Cantidad', sql.Int, Cantidad)
    .input('Estado', sql.NVarChar(20), Estado)
    .input('Observaciones', sql.NVarChar(200), Observaciones)
    .query(`INSERT INTO Inventario 
            (IdProducto, IdSucursal, Cantidad, Estado, Observaciones) 
            VALUES (@IdProducto, @IdSucursal, @Cantidad, @Estado, @Observaciones)`);
}

async function actualizarInventario(id, { IdProducto, IdSucursal, Cantidad, Estado, Observaciones }) {
  const pool = await poolPromise;
  await pool.request()
    .input('IdInventario', sql.Int, id)
    .input('IdProducto', sql.Int, IdProducto)
    .input('IdSucursal', sql.Int, IdSucursal)
    .input('Cantidad', sql.Int, Cantidad)
    .input('Estado', sql.NVarChar(20), Estado)
    .input('Observaciones', sql.NVarChar(200), Observaciones)
    .query(`UPDATE Inventario SET
            IdProducto = @IdProducto,
            IdSucursal = @IdSucursal,
            Cantidad = @Cantidad,
            Estado = @Estado,
            Observaciones = @Observaciones
            WHERE IdInventario = @IdInventario`);
}

async function eliminarInventario(id) {
  const pool = await poolPromise;
  await pool.request()
    .input('IdInventario', sql.Int, id)
    .query(`DELETE FROM Inventario WHERE IdInventario = @IdInventario`);
}

module.exports = {
  obtenerInventarios,
  obtenerInventarioPorId,
  crearInventario,
  actualizarInventario,
  eliminarInventario
};
