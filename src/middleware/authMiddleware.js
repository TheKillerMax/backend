const jwt = require('jsonwebtoken');

/**
 * Middleware que protege rutas privadas verificando la existencia
 * de la cookie con el token y validando su firma y expiración.
 */
function authMiddleware(req, res, next) {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      message: 'Acceso denegado. Token no proporcionado.'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        message: 'Token expirado. Inicia sesión nuevamente.'
      });
    }

    return res.status(401).json({
      message: 'Token inválido. No autorizado.'
    });
  }
}

module.exports = authMiddleware;
