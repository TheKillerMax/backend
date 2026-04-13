const crypto = require('crypto');
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}
const users = [
  { id: 1, username: 'admin', passwordHash: hashPassword('Admin1234!'), role: 'administrador', name: 'Administrador Demo' },
  { id: 2, username: 'analista', passwordHash: hashPassword('Analista123!'), role: 'analista', name: 'Analista Demo' }
];
module.exports = { users, hashPassword };
