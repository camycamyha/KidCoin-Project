import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log("Iniciando seed...")

  // 1. Criar um Módulo
  const modulo1 = await prisma.modulo.create({
    data: {
      titulo: "Introdução ao KidCoin",
      descricao: "Aprenda a poupar",
      ordem: 1,
      posX: 50,
      posY: 50
    }
  })

  // 2. Criar uma Sala (Necessária se a Tarefa pedir salaId)
  const sala1 = await prisma.sala.create({
    data: {
      nome: "Turma de Teste",
      codigo: "TESTE123"
    }
  })

  // 3. Criar a Tarefa vinculando ao Módulo e à Sala
  await prisma.tarefa.create({
    data: {
      titulo: "Minha Primeira Missão",
      recompensa: 100,
      concluida: false,
      moduloId: modulo1.id, // Conecta com o módulo criado acima
      salaId: sala1.id      // Conecta com a sala criada acima (se seu schema exigir)
    }
  })

  console.log("Seed finalizado com sucesso! 🌱")
}

main()
  .catch((e) => {
    console.error("Erro no Seed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })