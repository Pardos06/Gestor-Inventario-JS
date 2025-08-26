const movimientoInventarioModel = require('../models/movimientoInventarioModel');

const listarMovimientos = async (req, res) => {
  try {
    const movimientos = await movimientoInventarioModel.obtenerMovimientos();
    res.json(movimientos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al listar movimientos de inventario' });
  }
};

const obtenerMovimientoPorId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const movimiento = await movimientoInventarioModel.obtenerMovimientoPorId(id);
    if (!movimiento) {
      return res.status(404).json({ error: 'Movimiento no encontrado' });
    }
    res.json(movimiento);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener movimiento de inventario' });
  }
};

const crearMovimiento = async (req, res) => {
  try {
    const nuevoMovimiento = req.body;

    // Validaciones simples (puedes expandirlas según necesites)
    if (!nuevoMovimiento.IdProducto || !nuevoMovimiento.IdSucursal || !nuevoMovimiento.IdUsuario ||
        !nuevoMovimiento.TipoMovimiento || !nuevoMovimiento.Cantidad) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    // Insertar movimiento
    await movimientoInventarioModel.crearMovimiento(nuevoMovimiento);
    res.status(201).json({ message: 'Movimiento creado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear movimiento de inventario' });
  }
};

const actualizarMovimiento = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const datosActualizados = req.body;

    // Puedes agregar validaciones similares a crearMovimiento aquí si quieres

    await movimientoInventarioModel.actualizarMovimiento(id, datosActualizados);
    res.json({ message: 'Movimiento actualizado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar movimiento de inventario' });
  }
};

const eliminarMovimiento = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await movimientoInventarioModel.eliminarMovimiento(id);
    res.json({ message: 'Movimiento eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar movimiento de inventario' });
  }
};

module.exports = {
  listarMovimientos,
  obtenerMovimientoPorId,
  crearMovimiento,
  actualizarMovimiento,
  eliminarMovimiento
};
