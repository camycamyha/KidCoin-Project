const { PrismaClient } = require('@prisma/client')
const { AppError } = require('../../../../shared/middlewares/error.middleware')

const prisma = new PrismaClient()

async function listItems(category) {
  return prisma.shopItem.findMany({
    where: { active: true, ...(category && { category }) },
    orderBy: { price: 'asc' }
  })
}

async function buyItem(userId, itemId) {
  const student = await prisma.studentProfile.findUnique({ where: { userId } })
  if (!student) throw new AppError('Perfil de aluno não encontrado', 404)

  const item = await prisma.shopItem.findUnique({ where: { id: itemId } })
  if (!item || !item.active) throw new AppError('Item não encontrado', 404)

  if (student.totalCoins < item.price) {
    throw new AppError(`Moedas insuficientes. Você tem ${student.totalCoins} e o item custa ${item.price}`, 400)
  }

  const alreadyOwns = await prisma.purchase.findFirst({
    where: { studentId: student.id, itemId }
  })
  if (alreadyOwns) throw new AppError('Você já possui esse item', 409)

  const [purchase] = await prisma.$transaction([
    prisma.purchase.create({
      data: { studentId: student.id, itemId, pricePaid: item.price }
    }),
    prisma.studentProfile.update({
      where: { id: student.id },
      data: { totalCoins: { decrement: item.price } }
    }),
    prisma.coinTransaction.create({
      data: {
        studentId: student.id,
        amount: -item.price,
        description: `Compra na loja: ${item.name}`
      }
    })
  ])

  return { purchase, item, remainingCoins: student.totalCoins - item.price }
}

async function getMyItems(userId) {
  const student = await prisma.studentProfile.findUnique({ where: { userId } })
  if (!student) throw new AppError('Perfil de aluno não encontrado', 404)

  return prisma.purchase.findMany({
    where: { studentId: student.id },
    include: { item: true },
    orderBy: { boughtAt: 'desc' }
  })
}

async function createItem({ name, description, imageUrl, price, category }) {
  return prisma.shopItem.create({
    data: { name, description, imageUrl, price, category }
  })
}

module.exports = { listItems, buyItem, getMyItems, createItem }