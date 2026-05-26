// packages/auth-service/src/services/auth.service.js
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { AppError } = require('@kidcoin/shared/middlewares/error.middleware')

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET || 'kidcoin_secret_dev'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '8h'

async function login(email, password) {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { school: true },
  })

  if (!user || !user.active) {
    throw new AppError('E-mail ou senha inválidos', 401)
  }

  const passwordMatch = await bcrypt.compare(password, user.password)
  if (!passwordMatch) {
    throw new AppError('E-mail ou senha inválidos', 401)
  }

  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    schoolId: user.schoolId,
    name: user.name,
  }

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      school: user.school?.name,
    },
  }
}

async function me(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      school: { select: { id: true, name: true } },
      studentProfile: { select: { totalCoins: true, totalXp: true, avatarUrl: true } },
    },
  })

  if (!user) throw new AppError('Usuário não encontrado', 404)
  return user
}

module.exports = { login, me }
