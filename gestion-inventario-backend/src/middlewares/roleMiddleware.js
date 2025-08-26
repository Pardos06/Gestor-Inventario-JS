function verificarRol(...rolesPermitidos) {
  return (req, res, next) => {
    if (!req.user || !req.user.rol) {
      return res.status(403).json({ error: 'Rol del usuario no definido' });
    }

    // Normalizamos el rol del usuario y los permitidos: eliminamos espacios y pasamos a minúsculas
    const rolUsuario = req.user.rol.trim().toLowerCase();
    const rolesPermitidosNormalizados = rolesPermitidos.map(r => r.trim().toLowerCase());

    if (!rolesPermitidosNormalizados.includes(rolUsuario)) {
      return res.status(403).json({ error: 'Acceso denegado' });
    }

    next();
  };
}

module.exports = verificarRol;
