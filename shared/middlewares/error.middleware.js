// shared/middlewares/error.middleware.js

function errorMiddleware(err, req, res, next) {
  console.error(`[ERROR] ${req.method} ${req.path}:`, err.message)

  const status = err.status || err.statusCode || 500
  const message = err.message || 'Erro interno do servidor'

  res.status(status).json({
    error: true,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
}

class AppError extends Error {
  constructor(message, status = 400) {
    super(message)
    this.status = status
  }
}

module.exports = { errorMiddleware, AppError }
