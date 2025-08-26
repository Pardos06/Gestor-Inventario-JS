const express = require('express');
const router = express.Router();
const movimientInventarioController = require('../controllers/movimientoInventarioController');

router.get('/', movimientInventarioController.listarMovimientos);
router.get('/:id', movimientInventarioController.obtenerMovimientoPorId);
router.post('/', movimientInventarioController.crearMovimiento);
router.put('/:id', movimientInventarioController.actualizarMovimiento);
router.delete('/:id', movimientInventarioController.eliminarMovimiento);

module.exports = router;
