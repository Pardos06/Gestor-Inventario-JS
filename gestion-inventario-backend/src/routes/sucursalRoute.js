const express = require('express');
const router = express.Router();
const sucursalController = require('../controllers/sucursalController');

router.get('/', sucursalController.listarSucursales);
router.get('/:id', sucursalController.obtenerSucursalPorId);
router.post('/', sucursalController.crearSucursal);
router.put('/:id', sucursalController.actualizarSucursal);
router.delete('/:id', sucursalController.eliminarSucursal);

module.exports = router;
