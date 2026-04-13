const crypto = require('crypto');

/**
 * Genera un hash SHA-256 para evitar dejar contraseñas en texto plano
 * dentro del flujo de validación. En este proyecto se usan usuarios
 * ficticios, por lo que este enfoque es suficiente como demostración.
 */
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

/**
 * Usuarios ficticios requeridos por la pauta.
 * En una aplicación real estos datos deberían vivir en una base de datos.
 */
const users = [
  {
    id: 1,
    username: 'admin',
    passwordHash: hashPassword('Admin1234!'),
    role: 'administrador',
    name: 'Administrador Demo'
  },
  {
    id: 2,
    username: 'analista',
    passwordHash: hashPassword('Analista123!'),
    role: 'analista',
    name: 'Analista Demo'
  }
];

module.exports = {
  users,
  hashPassword
};
