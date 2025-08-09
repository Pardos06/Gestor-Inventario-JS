// src/routes/productoRoutes.js
const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

router.get('/', productoController.getProductos);
router.post('/', productoController.postProducto);
router.put('/:id', productoController.putProducto);
router.delete('/:id', productoController.deleteProducto);

module.exports = router;
