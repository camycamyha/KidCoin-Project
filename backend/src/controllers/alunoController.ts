import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const buscarPerfilAluno = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;

    // Buscamos o aluno e "incluímos" os dados da Sala e das Tarefas dessa sala
    const aluno = await prisma.usuario.findUnique({
      where: { id: userId },
      include: {
        sala: {
          include: {
            tarefas: true // Aqui buscamos as tarefas através da sala
          }
        }
      }
    });

    if (!aluno || aluno.tipo !== "Aluno") {
      return res.status(404).json({ error: "Perfil de aluno não encontrado." });
    }

    // Como as tarefas estão dentro de 'sala', acessamos assim:
    const tarefasDaSala = aluno.sala?.tarefas || [];
    
    const concluidas = tarefasDaSala.filter(t => t.concluida === true).length;
    const total = tarefasDaSala.length;
    const porcentagem = total > 0 ? Math.round((concluidas / total) * 100) : 0;

    return res.status(200).json({
      nome: aluno.nome,
      email: aluno.email,
      saldo: aluno.saldo,
      sala: aluno.sala?.nome || "Sem sala vinculada",
      progresso: {
        totalTarefas: total,
        concluidas: concluidas,
        porcentagem: `${porcentagem}%`
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao carregar dashboard do aluno." });
  }
};