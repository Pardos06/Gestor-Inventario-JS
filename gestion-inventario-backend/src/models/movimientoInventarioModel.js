const { sql, poolPromise } = require('../config/db');

async function obtenerMovimientos() {
  const pool = await poolPromise;
  const result = await pool.request()
    .query('SELECT * FROM MovimientoInventario');
  return result.recordset;
}

async function obtenerMovimientoPorId(id) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('IdMovimiento', sql.Int, id)
    .query('SELECT * FROM MovimientoInventario WHERE IdMovimiento = @IdMovimiento');
  return result.recordset[0];
}

async function crearMovimiento({ IdProducto, IdSucursal, IdUsuario, TipoMovimiento, Cantidad, FechaMovimiento, Comentarios }) {
  const pool = await poolPromise;
  await pool.request()
    .input('IdProducto', sql.Int, IdProducto)
    .input('IdSucursal', sql.Int, IdSucursal)
    .input('IdUsuario', sql.Int, IdUsuario)
    .input('TipoMovimiento', sql.NVarChar(20), TipoMovimiento)
    .input('Cantidad', sql.Int, Cantidad)
    .input('FechaMovimiento', sql.DateTime, FechaMovimiento) // Puede ser null para usar GETDATE()
    .input('Comentarios', sql.NVarChar(500), Comentarios)
    .query(`INSERT INTO MovimientoInventario 
            (IdProducto, IdSucursal, IdUsuario, TipoMovimiento, Cantidad, FechaMovimiento, Comentarios)
            VALUES 
            (@IdProducto, @IdSucursal, @IdUsuario, @TipoMovimiento, @Cantidad, ISNULL(@FechaMovimiento, GETDATE()), @Comentarios)`);
}

async function actualizarMovimiento(id, { IdProducto, IdSucursal, IdUsuario, TipoMovimiento, Cantidad, FechaMovimiento, Comentarios }) {
  const pool = await poolPromise;
  await pool.request()
    .input('IdMovimiento', sql.Int, id)
    .input('IdProducto', sql.Int, IdProducto)
    .input('IdSucursal', sql.Int, IdSucursal)
    .input('IdUsuario', sql.Int, IdUsuario)
    .input('TipoMovimiento', sql.NVarChar(20), TipoMovimiento)
    .input('Cantidad', sql.Int, Cantidad)
    .input('FechaMovimiento', sql.DateTime, FechaMovimiento)
    .input('Comentarios', sql.NVarChar(500), Comentarios)
    .query(`UPDATE MovimientoInventario
            SET IdProducto = @IdProducto,
                IdSucursal = @IdSucursal,
                IdUsuario = @IdUsuario,
                TipoMovimiento = @TipoMovimiento,
                Cantidad = @Cantidad,
                FechaMovimiento = @FechaMovimiento,
                Comentarios = @Comentarios
            WHERE IdMovimiento = @IdMovimiento`);
}

async function eliminarMovimiento(id) {
  const pool = await poolPromise;
  await pool.request()
    .input('IdMovimiento', sql.Int, id)
    .query('DELETE FROM MovimientoInventario WHERE IdMovimiento = @IdMovimiento');
}

module.exports = {
  obtenerMovimientos,
  obtenerMovimientoPorId,
  crearMovimiento,
  actualizarMovimiento,
  eliminarMovimiento
};
