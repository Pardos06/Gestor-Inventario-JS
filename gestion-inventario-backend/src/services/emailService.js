const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function enviarCorreoConfirmacion(correo, nombre, tokenConfirmacion) {
  const confirmLink = `${process.env.FRONTEND_URL}/confirmar/${tokenConfirmacion}`;
  const mailOptions = {
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: correo,
    subject: 'Confirma tu cuenta',
    html: `<p>Hola ${nombre},</p>
           <p>Por favor confirma tu cuenta haciendo clic en el siguiente enlace:</p>
           <a href="${confirmLink}">${confirmLink}</a>
           <p>Si no creaste esta cuenta, ignora este correo.</p>`
  };
  return transporter.sendMail(mailOptions);
}

async function enviarCorreoRecuperacion(correo, nombre, tokenRecuperacion) {
  const recoveryLink = `${process.env.FRONTEND_URL}/recuperar/${tokenRecuperacion}`;
  const mailOptions = {
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: correo,
    subject: 'Recuperación de contraseña',
    html: `<p>Hola ${nombre},</p>
           <p>Haz solicitado restablecer tu contraseña. Haz clic en el enlace para continuar:</p>
           <a href="${recoveryLink}">${recoveryLink}</a>
           <p>Si no solicitaste esto, ignora este correo.</p>`
  };
  return transporter.sendMail(mailOptions);
}

module.exports = {
  enviarCorreoConfirmacion,
  enviarCorreoRecuperacion
};
