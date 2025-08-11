const sucursalModel = require('../models/sucursalModel');

const listarSucursales = async (req, res) => {
  try {
    const sucursales = await sucursalModel.obtenerSucursales();
    res.json(sucursales);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar las sucursales' });
  }
};

const obtenerSucursalPorId = async (req, res) => {
  try {
    const id = req.params.id;
    const sucursal = await sucursalModel.obtenerSucursalPorId(id);
    if (!sucursal) return res.status(404).json({ error: 'Sucursal no encontrado' });
    res.json(sucursal);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la sucursal' });
  }
};

const crearSucursal = async (req, res) => {
  try {
    const nuevaSucursal = req.body;
    await sucursalModel.crearSucursal(nuevaSucursal);
    res.status(201).json({ message: 'Sucursal creada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la sucursal' });
  }
};

const actualizarSucursal = async (req, res) => {
  try {
    const id = req.params.id;
    const datosActualizados = req.body;
    await sucursalModel.actualizarSucursal(id, datosActualizados);
    res.json({ message: 'Datos de la sucursal actualizados' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar los datos de la sucursal' });
  }
};

const eliminarSucursal = async (req, res) => {
  try {
    const id = req.params.id;
    await sucursalModel.eliminarSucursal(id);
    res.json({ message: 'Sucursal eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la sucursal' });
  }
};

module.exports = {
    listarSucursales,
    obtenerSucursalPorId,
    crearSucursal,
    actualizarSucursal,
    eliminarSucursal
};
