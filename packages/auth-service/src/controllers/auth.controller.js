// packages/auth-service/src/controllers/auth.controller.js
const authService = require('../services/auth.service')

async function login(req, res, next) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'E-mail e senha são obrigatórios' })
    }
    
    const result = await authService.login(email, password)
    res.json(result)
  } catch (err) {
    next(err)
  }
}

async function me(req, res, next) {
  try {
    const user = await authService.me(req.user.id)
    res.json(user)
  } catch (err) {
    next(err)
  }
}

module.exports = { login, me }
