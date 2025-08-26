const express = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const productoController = require('../controllers/productoController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: API para gestionar productos
 */

/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Obtener la lista de productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos
 */
router.get('/', productoController.listarProductos);

/**
 * @swagger
 * /productos/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       404:
 *         description: Producto no encontrado
 */
router.get('/:id', [
    check('id', 'El ID debe ser un número entero').isInt({ min: 1 }),
    validarCampos
], productoController.obtenerProductoPorId);

/**
 * @swagger
 * /productos:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               precio:
 *                 type: number
 *               stock:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 */
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('precio', 'El precio debe ser un número válido').isFloat({ gt: 0 }),
    check('stock', 'El stock debe ser un número entero').isInt({ min: 0 }),
    validarCampos
], productoController.crearProducto);

/**
 * @swagger
 * /productos/{id}:
 *   put:
 *     summary: Actualizar un producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               precio:
 *                 type: number
 *               stock:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Producto actualizado
 *       404:
 *         description: Producto no encontrado
 */
router.put('/:id', [
    check('id', 'El ID debe ser un número entero').isInt({ min: 1 }),
    check('nombre', 'El nombre es obligatorio').optional().not().isEmpty(),
    check('precio', 'El precio debe ser un número válido').optional().isFloat({ gt: 0 }),
    check('stock', 'El stock debe ser un número entero').optional().isInt({ min: 0 }),
    validarCampos
], productoController.actualizarProducto);

/**
 * @swagger
 * /productos/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado
 *       404:
 *         description: Producto no encontrado
 */
router.delete('/:id', [
    check('id', 'El ID debe ser un número entero').isInt({ min: 1 }),
    validarCampos
], productoController.eliminarProducto);

module.exports = router;
