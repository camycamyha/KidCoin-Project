import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getMapa = async (req: Request, res: Response) => {
  try {
    // Certifique-se de que é 'modulo' com 'm' minúsculo aqui
    const modulos = await prisma.modulo.findMany({
      orderBy: { ordem: 'asc' },
      include: { 
        tarefas: true 
      }
    });

    return res.status(200).json(modulos);
  } catch (error) {
    console.error("Erro ao buscar o mapa:", error);
    return res.status(500).json({ error: "Erro ao carregar o mapa do KidCoin." });
  }
};