const productoModel = require('../models/productoModel');

const listarProductos = async (req, res) => {
  try {
    const productos = await productoModel.obtenerProductos();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar productos' });
  }
};

async function obtenerProductoPorId(req, res, next) { 
  try {
    const productos = await productoModel.obtenerProductoPorId(req.params.id);
    res.json(productos);
  } catch (error) {
    next(error);
  }
}

async function crearProducto(req, res, next) {
  try {
    const nuevoProducto = req.body;
    await productoModel.crearProducto(nuevoProducto);
    res.status(201).json({ mensaje: 'Producto creado' });
  } catch (error) {
    next(error);
  }
}
async function actualizarProducto(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const productoActualizado = req.body;  // aquí debe venir el objeto con los datos
    if (!productoActualizado) {
      return res.status(400).json({ error: 'Faltan datos en el cuerpo de la petición' });
    }
    await productoModel.actualizarProducto(id, productoActualizado);
    res.json({ mensaje: 'Producto actualizado' });
  } catch (error) {
    next(error);
  }
}

async function eliminarProducto(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    await productoModel.eliminarProducto(id);
    res.json({ mensaje: 'Producto eliminado' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listarProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto
};
