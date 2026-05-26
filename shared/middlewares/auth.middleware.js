// shared/middlewares/auth.middleware.js
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || 'kidcoin_secret_dev'

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization']

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token não fornecido' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded // { id, email, role, schoolId }
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido ou expirado' })
  }
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Não autenticado' })
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Acesso negado para este perfil' })
    }
    next()
  }
}

module.exports = { authMiddleware, requireRole }
