const jwt = require('jsonwebtoken');
const secretJWT = process.env.JWT_SECRET || 'tu_secreto_jwt';

function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Token requerido' });

  const token = authHeader.split(' ')[1]; // Bearer TOKEN
  if (!token) return res.status(401).json({ error: 'Token requerido' });

  jwt.verify(token, secretJWT, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });

    // decoded contiene { id, nombre, rol } si lo pusimos en el token
    req.user = decoded;
    console.log('Usuario autenticado:', req.user);
    next();
  });
}

module.exports = autenticarToken;
