// shared/prisma/seed.js
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('Iniciando seed...')

  // Escola
  const school = await prisma.school.upsert({
    where: { cnpj: '12.345.678/0001-00' },
    update: {},
    create: {
      name: 'Escola Municipal KidCoin',
      cnpj: '12.345.678/0001-00',
    },
  })
  console.log('✓ Escola criada:', school.name)

  const hash = (pwd) => bcrypt.hashSync(pwd, 10)

  // Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@kidcoin.com' },
    update: {},
    create: {
      name: 'Administrador',
      email: 'admin@kidcoin.com',
      password: hash('Admin@123'),
      role: 'ADMIN',
      schoolId: school.id,
    },
  })
  console.log('✓ Admin criado:', admin.email)

  // Professor
  const teacher = await prisma.user.upsert({
    where: { email: 'prof@kidcoin.com' },
    update: {},
    create: {
      name: 'Prof. Maria Silva',
      email: 'prof@kidcoin.com',
      password: hash('Prof@123'),
      role: 'TEACHER',
      schoolId: school.id,
      teacherProfile: { create: {} },
    },
    include: { teacherProfile: true },
  })
  console.log('✓ Professor criado:', teacher.email)

  // Aluno
  const student = await prisma.user.upsert({
    where: { email: 'aluno@kidcoin.com' },
    update: {},
    create: {
      name: 'João Aluno',
      email: 'aluno@kidcoin.com',
      password: hash('Aluno@123'),
      role: 'STUDENT',
      schoolId: school.id,
      studentProfile: { create: { totalCoins: 50, totalXp: 100 } },
    },
    include: { studentProfile: true },
  })
  console.log('✓ Aluno criado:', student.email)

  // Sala
  const classroom = await prisma.classroom.upsert({
    where: { code: 'TURMA-5A' },
    update: {},
    create: {
      name: '5º Ano A',
      description: 'Turma de educação financeira',
      code: 'TURMA-5A',
      schoolId: school.id,
      teachers: {
        create: { teacherId: teacher.teacherProfile.id },
      },
      students: {
        create: { studentId: student.studentProfile.id },
      },
    },
  })
  console.log('✓ Sala criada:', classroom.name)

  // Itens da loja — busca por nome para evitar duplicatas
  const items = [
    { name: 'Chapéu de Cowboy', category: 'hat',       price: 30, imageUrl: '/items/hat-cowboy.png' },
    { name: 'Óculos de Sol',    category: 'accessory', price: 20, imageUrl: '/items/glasses.png' },
    { name: 'Camiseta Azul',    category: 'shirt',     price: 25, imageUrl: '/items/shirt-blue.png' },
    { name: 'Tênis Colorido',   category: 'shoes',     price: 40, imageUrl: '/items/shoes-color.png' },
    { name: 'Mochila Espacial', category: 'accessory', price: 50, imageUrl: '/items/backpack.png' },
  ]

  await prisma.shopItem.createMany({
    data: items,
    skipDuplicates: true,
  })
  console.log('✓ Itens da loja criados')

  console.log('\n Seed concluído!')
  console.log('\nUsuários de teste:')
  console.log('  Admin:     admin@kidcoin.com  / Admin@123')
  console.log('  Professor: prof@kidcoin.com   / Prof@123')
  console.log('  Aluno:     aluno@kidcoin.com  / Aluno@123')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())