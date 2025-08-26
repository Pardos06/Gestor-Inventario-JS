const jwt = require('jsonwebtoken');

function generarToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION
  });
}

function verificarToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null; // o lanza error según convenga
  }
}

module.exports = {
  generarToken,
  verificarToken
};
