require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { users, hashPassword } = require('./config/users');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.get('/health', (_req, res) => {
  return res.status(200).json({ message: 'Servidor Express operativo.' });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Debes enviar username y password.' });
  }

  const user = users.find((item) => item.username === username);
  if (!user || user.passwordHash !== hashPassword(password)) {
    return res.status(401).json({ message: 'Credenciales incorrectas. No autorizado.' });
  }

  const token = jwt.sign(
    { sub: user.id, username: user.username, role: user.role, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000
  });

  return res.status(200).json({
    message: 'Inicio de sesión exitoso.',
    user: { id: user.id, username: user.username, role: user.role, name: user.name }
  });
});

app.get('/privado', authMiddleware, (req, res) => {
  return res.status(200).json({
    message: 'Acceso autorizado a la ruta privada.',
    user: req.user,
    data: { modulo: 'Programación segura', asignatura: 'Taller de plataformas Web' }
  });
});

app.post('/logout', (_req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });

  return res.status(200).json({ message: 'Sesión cerrada correctamente.' });
});

app.use((req, res) => {
  return res.status(404).json({ message: `Ruta no encontrada: ${req.method} ${req.originalUrl}` });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
