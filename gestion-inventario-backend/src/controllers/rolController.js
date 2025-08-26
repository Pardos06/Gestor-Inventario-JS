const rolModel = require('../models/rolModel');

const listarRoles = async (req, res) => {
  try {
    const roles = await rolModel.obtenerRoles();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar los roles' });
  }
};

async function obtenerRolPorId(req, res, next) { 
  try {
    const rol = await rolModel.obtenerRolPorId(req.params.id);
    res.json(rol);
  } catch (error) {
    next(error);
  }
}

async function crearRol(req, res, next) {
  try {
    const nuevoRol = req.body;
    await rolModel.crearRol(nuevoRol);
    res.status(201).json({ mensaje: 'Nuevo rol creado' });
  } catch (error) {
    next(error);
  }
}
const actualizarRol = async (req, res) => {
  try {
    const id = req.params.id;
    const rolActualizado = req.body;
    await rolModel.actualizarRol(id, rolActualizado);
    res.json({ message: 'Rol actualizado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el rol' });
  }
};

async function eliminarRol(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    await rolModel.eliminarRol(id);
    res.json({ mensaje: 'Rol eliminado' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listarRoles,
  obtenerRolPorId,
  crearRol,
  actualizarRol,
  eliminarRol
};
