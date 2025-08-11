const inventarioModel = require('../models/inventarioModel');

const listarInventarios = async (req, res) => {
  try {
    const inventarios = await inventarioModel.obtenerInventarios();
    res.json(inventarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar inventarios' });
  }
};

const obtenerInventarioPorId = async (req, res) => {
  try {
    const id = req.params.id;
    const inventario = await inventarioModel.obtenerInventarioPorId(id);
    if (!inventario) return res.status(404).json({ error: 'Inventario no encontrado' });
    res.json(inventario);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener inventario' });
  }
};

const crearInventario = async (req, res) => {
  try {
    const nuevoInventario = req.body;
    await inventarioModel.crearInventario(nuevoInventario);
    res.status(201).json({ message: 'Inventario creado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear inventario' });
  }
};

const actualizarInventario = async (req, res) => {
  try {
    const id = req.params.id;
    const datosActualizados = req.body;
    await inventarioModel.actualizarInventario(id, datosActualizados);
    res.json({ message: 'Inventario actualizado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar inventario' });
  }
};

const eliminarInventario = async (req, res) => {
  try {
    const id = req.params.id;
    await inventarioModel.eliminarInventario(id);
    res.json({ message: 'Inventario eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar inventario' });
  }
};

module.exports = {
  listarInventarios,
  obtenerInventarioPorId,
  crearInventario,
  actualizarInventario,
  eliminarInventario
};
