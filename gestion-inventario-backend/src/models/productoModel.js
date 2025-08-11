const { sql, poolPromise } = require('../config/db');

async function obtenerProductos() {
  const pool = await poolPromise;
  const result = await pool.request()
    .query('SELECT * FROM Producto');
  return result.recordset;
}
async function obtenerProductoPorId(id) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('IdProducto', sql.Int, id)
    .query('SELECT * FROM Producto WHERE IdProducto = @IdProducto');
  return result.recordset[0]; // Retorna un solo producto o undefined
}

async function crearProducto({ NombreProducto, Descripcion, Precio, IdProveedor, FechaIngreso, Imagen, Marca }) {
  const pool = await poolPromise;
  await pool.request()
    .input('NombreProducto', sql.NVarChar(150), NombreProducto)
    .input('Descripcion', sql.NVarChar(500), Descripcion)
    .input('Precio', sql.Decimal(10, 2), Precio)
    .input('IdProveedor', sql.Int, IdProveedor)
    .input('FechaIngreso', sql.DateTime, FechaIngreso)
    .input('Imagen', sql.VarBinary(sql.MAX), Imagen) // Imagen como Buffer o null
    .input('Marca', sql.NVarChar(100), Marca)
    .query(`INSERT INTO Producto (NombreProducto, Descripcion, Precio, IdProveedor, FechaIngreso, Imagen, Marca)
            VALUES (@NombreProducto, @Descripcion, @Precio, @IdProveedor, @FechaIngreso, @Imagen, @Marca)`);
}

async function actualizarProducto(id, { NombreProducto, Descripcion, Precio, IdProveedor, FechaIngreso, Imagen, Marca }) {
  const pool = await poolPromise;
  await pool.request()
    .input('IdProducto', sql.Int, id)
    .input('NombreProducto', sql.NVarChar(150), NombreProducto)
    .input('Descripcion', sql.NVarChar(500), Descripcion)
    .input('Precio', sql.Decimal(10, 2), Precio)
    .input('IdProveedor', sql.Int, IdProveedor)
    .input('FechaIngreso', sql.DateTime, FechaIngreso)
    .input('Imagen', sql.VarBinary(sql.MAX), Imagen) // Imagen como Buffer o null
    .input('Marca', sql.NVarChar(100), Marca)
    .query(`UPDATE Producto
            SET NombreProducto = @NombreProducto,
                Descripcion = @Descripcion,
                Precio = @Precio,
                IdProveedor = @IdProveedor,
                FechaIngreso = @FechaIngreso,
                Imagen = @Imagen,
                Marca = @Marca
            WHERE IdProducto = @IdProducto`);
}

async function eliminarProducto(id){
    const pool = await poolPromise;
    await pool.request()
        .input('IdProducto', sql.Int, id)
        .query(`DELETE FROM Producto WHERE IdProducto = @IdProducto`)
}
module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto
};
