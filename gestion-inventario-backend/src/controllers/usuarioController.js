const usuarioModel = require('../models/usuarioModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const emailService = require('../services/emailService');

const secretJWT = process.env.JWT_SECRET || 'Universidad2025';
const jwtExpiration = process.env.JWT_EXPIRATION || '8h';
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

async function registrarUsuario(req, res) {
  try {
    const { Nombre, Apellido, Correo, Contrasena, IdRol } = req.body;

    const existente = await usuarioModel.obtenerUsuarioPorCorreo(Correo);
    if (existente) return res.status(400).json({ error: 'Correo ya registrado' });

    const { tokenConfirmacion } = await usuarioModel.crearUsuario({ Nombre, Apellido, Correo, Contrasena, IdRol });

    await emailService.enviarCorreoConfirmacion(Correo, Nombre, tokenConfirmacion);

    res.status(201).json({ message: 'Usuario creado. Revisa tu correo para confirmar la cuenta.' });
  } catch (error) {
    console.error('Error en registrarUsuario:', error);
    res.status(500).json({ error: 'Error al crear usuario' });
  }
}

async function confirmarCuenta(req, res) {
  try {
    const { token } = req.params;

    console.log('Token recibido para confirmar cuenta:', token);

    const confirmado = await usuarioModel.confirmarUsuario(token.trim());
    if (!confirmado) return res.status(400).json({ error: 'Token inválido o expirado' });

    res.json({ message: 'Cuenta confirmada exitosamente' });
  } catch (error) {
    console.error('Error en confirmarCuenta:', error);
    res.status(500).json({ error: 'Error al confirmar cuenta' });
  }
}
async function login(req, res) {
  try {
    const { Correo, Contrasena } = req.body;

    const usuario = await usuarioModel.obtenerUsuarioPorCorreo(Correo);

    console.log('Usuario obtenido del modelo:', usuario); // <<-- línea de prueba

    if (!usuario) return res.status(400).json({ error: 'Correo o contraseña incorrectos' });
    if (!usuario.Confirmado) return res.status(403).json({ error: 'Cuenta no confirmada' });

    const validPassword = await bcrypt.compare(Contrasena, usuario.Contrasena);
    if (!validPassword) return res.status(400).json({ error: 'Correo o contraseña incorrectos' });

    const token = jwt.sign({
      id: usuario.IdUsuario,
      correo: usuario.Correo,
      rol: usuario.NombreRol
    }, secretJWT, { expiresIn: jwtExpiration });

    res.json({ token });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error en login' });
  }
}

async function solicitarRecuperacion(req, res) {
  try {
    const { Correo } = req.body;
    const usuario = await usuarioModel.obtenerUsuarioPorCorreo(Correo);
    if (!usuario) return res.status(400).json({ error: 'Correo no registrado' });

    const tokenRecuperacion = crypto.randomBytes(50).toString('hex');
    const expiracion = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

    await usuarioModel.guardarTokenRecuperacion(usuario.IdUsuario, tokenRecuperacion, expiracion);

    await emailService.enviarCorreoRecuperacion(Correo, usuario.Nombre, tokenRecuperacion);

    res.json({ message: 'Correo de recuperación enviado' });
  } catch (error) {
    console.error('Error en solicitarRecuperacion:', error);
    res.status(500).json({ error: 'Error al solicitar recuperación' });
  }
}

async function restablecerContrasena(req, res) {
  try {
    const { token } = req.params;
    const { nuevaContrasena } = req.body;

    const usuario = await usuarioModel.obtenerUsuarioPorTokenRecuperacion(token.trim());
    if (!usuario) return res.status(400).json({ error: 'Token inválido o expirado' });

    await usuarioModel.actualizarContrasenaPorToken(usuario.IdUsuario, nuevaContrasena);

    res.json({ message: 'Contraseña actualizada exitosamente' });
  } catch (error) {
    console.error('Error en restablecerContrasena:', error);
    res.status(500).json({ error: 'Error al restablecer contraseña' });
  }
}

async function obtenerUsuarios(req, res) {
  try {
    const usuarios = await usuarioModel.obtenerUsuarios();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
}

async function obtenerUsuarioPorId(req, res) {
  try {
    const id = req.params.id;
    const usuario = await usuarioModel.obtenerUsuarioPorId(id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
}

async function actualizarUsuario(req, res) {
  try {
    const id = req.params.id;
    const datos = req.body;
    await usuarioModel.actualizarUsuario(id, datos);
    res.json({ message: 'Usuario actualizado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
}

async function eliminarUsuario(req, res) {
  try {
    const id = req.params.id;
    await usuarioModel.eliminarUsuario(id);
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
}

async function cambiarContrasena(req, res) {
  try {
    const id = req.params.id;
    const { nuevaContrasena } = req.body;
    await usuarioModel.cambiarContrasena(id, nuevaContrasena);
    res.json({ message: 'Contraseña actualizada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al cambiar contraseña' });
  }
}

module.exports = {
  registrarUsuario,
  confirmarCuenta,
  login,
  solicitarRecuperacion,
  restablecerContrasena,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
  cambiarContrasena
};
