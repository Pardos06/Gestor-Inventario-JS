const express = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const usuarioController = require('../controllers/usuarioController');
const autenticarToken = require('../middlewares/authMiddleware');
const verificarRol = require('../middlewares/roleMiddleware');

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Gestión de usuarios y autenticación
 */


/**
 * @swagger
 * /usuarios/registro:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - 
 *               - Apellido
 *               - Correo
 *               - Contrasena
 *               - idRol
 *             properties:
 *               :
 *                 type: string
 *                 example: Juan
 *               Apellido:
 *                 type: string
 *                 example: Pérez
 *               Correo:
 *                 type: string
 *                 example: juan@example.com
 *               Contrasena:
 *                 type: string
 *                 example: 123456
 *               idRol:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *       400:
 *         description: Datos inválidos o correo ya registrado
 */

// Registro de usuario
router.post('/registro', [
    check('Nombre', 'El  es obligatorio').trim().not().isEmpty(),
    check('Apellido', 'El Apellido es obligatorio').trim().not().isEmpty(),
    check('Correo', 'El Correo no es válido').isEmail(),
    check('Contrasena', 'La contraseña debe tener mínimo 6 caracteres').isLength({ min: 6 }),
    check('IdRol', 'El rol es obligatorio y debe ser un número entero').isInt(),
    validarCampos
], usuarioController.registrarUsuario);

/**
 * @swagger
 * /usuarios/confirmar/{token}:
 *   get:
 *     summary: Confirmar cuenta de usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cuenta confirmada exitosamente
 *       400:
 *         description: Token inválido o expirado
 */

// Confirmación de cuenta
router.get('/confirmar/:token', usuarioController.confirmarCuenta);
/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Correo
 *               - Contrasena
 *             properties:
 *               Correo:
 *                 type: string
 *                 example: juan@example.com
 *               Contrasena:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       403:
 *         description: Cuenta no confirmada
 *       400:
 *         description: Credenciales incorrectas
 */

// Login
router.post('/login', [
    check('Correo', 'El Correo no es válido').isEmail(),
    check('Contrasena', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], usuarioController.login);

/**
 * @swagger
 * /usuarios/recuperar:
 *   post:
 *     summary: Solicitar recuperación de contraseña
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Correo
 *             properties:
 *               Correo:
 *                 type: string
 *                 example: juan@example.com
 *     responses:
 *       200:
 *         description: Correo de recuperación enviado
 */

// Recuperación de contraseña
router.post('/recuperar', [
    check('Correo', 'El Correo no es válido').isEmail(),
    validarCampos
], usuarioController.solicitarRecuperacion);

/**
 * @swagger
 * /usuarios/restablecer/{token}:
 *   post:
 *     summary: Restablecer contraseña
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Contrasena:
 *                 type: string
 *                 example: nuevaPassword123
 *     responses:
 *       200:
 *         description: Contraseña actualizada exitosamente
 */

router.post('/restablecer/:token', [
    check('Contrasena', 'La contraseña debe tener mínimo 6 caracteres').isLength({ min: 6 }),
    validarCampos
], usuarioController.restablecerContrasena);

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Obtener todos los usuarios (solo Empleado de Tienda)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */

// Obtener todos los usuarios (solo Empleado de Tienda)
router.get('/', [
    autenticarToken,
    verificarRol('Gerente General'),
], usuarioController.obtenerUsuarios);

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 *
 *   put:
 *     summary: Actualizar usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:  
 *               :
 *                 type: string
 *               Apellido:
 *                 type: string
 *               Correo:
 *                 type: string
 *               idRol:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *
 *   delete:
 *     summary: Eliminar usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario eliminado
 */

// Obtener usuario por ID
router.get('/:id', [
    autenticarToken,
    verificarRol('Gerente General','Encargado de Almacén'),
    check('id', 'El ID debe ser un número entero').isInt({ min: 1 }),
    validarCampos
], usuarioController.obtenerUsuarioPorId);

// Actualizar usuario (Empleado de Tienda o empleado)
router.put('/:id', [
    autenticarToken,
    verificarRol('Gerente General', 'Encargado de Almacén'),
    check('id', 'El ID debe ser un número entero').isInt({ min: 1 }),
    check('Nombre').optional().isString(),
    check('Apellido').optional().isString(),
    check('Correo').optional().isEmail(),
    check('idRol').optional().isInt(),
    validarCampos
], usuarioController.actualizarUsuario);

// Eliminar usuario (solo Empleado de Tienda)
router.delete('/:id', [
    autenticarToken,
    verificarRol('Gerente General'),
    check('id', 'El ID debe ser un número entero').isInt({ min: 1 }),
    validarCampos
], usuarioController.eliminarUsuario);
/**
 * @swagger
 * /usuarios/cambiar-contrasena/{id}:
 *   put:
 *     summary: Cambiar contraseña de usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Contrasena:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contraseña actualizada
 */

// Cambiar contraseña
router.put('/cambiar-contrasena/:id', [
    autenticarToken,
    check('id', 'El ID debe ser un número entero').isInt({ min: 1 }),
    check('Contrasena', 'La nueva contraseña debe tener mínimo 6 caracteres').isLength({ min: 6 }),
    validarCampos
], usuarioController.cambiarContrasena);

module.exports = router;
