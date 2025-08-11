const proveedorModel = require('../models/proveedorModel');

const listarProveedores = async (req, res) => {
  try {
    const proveedores = await proveedorModel.obtenerProveedores();
    res.json(proveedores);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar proveedores' });
  }
};

const obtenerProveedorPorId = async (req, res) => {
  try {
    const id = req.params.id;
    const proveedor = await proveedorModel.obtenerProveedorPorId(id);
    if (!proveedor) return res.status(404).json({ error: 'Proveedor no encontrado' });
    res.json(proveedor);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener proveedor' });
  }
};

const crearProveedor = async (req, res) => {
  try {
    const nuevoProveedor = req.body;
    await proveedorModel.crearProveedor(nuevoProveedor);
    res.status(201).json({ message: 'Proveedor creado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear proveedor' });
  }
};

const actualizarProveedor = async (req, res) => {
  try {
    const id = req.params.id;
    const datosActualizados = req.body;
    await proveedorModel.actualizarProveedor(id, datosActualizados);
    res.json({ message: 'Proveedor actualizado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar proveedor' });
  }
};

const eliminarProveedor = async (req, res) => {
  try {
    const id = req.params.id;
    await proveedorModel.eliminarProveedor(id);
    res.json({ message: 'Proveedor eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar proveedor' });
  }
};

module.exports = {
  listarProveedores,
  obtenerProveedorPorId,
  crearProveedor,
  actualizarProveedor,
  eliminarProveedor
};
