import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 1. CRIAR MÓDULO (Para você popular o mapa antes da apresentação)
export const criarModulo = async (req: Request, res: Response) => {
  const { titulo, descricao, ordem, posX, posY } = req.body;
  try {
    const novoModulo = await prisma.modulo.create({
      data: { titulo, descricao, ordem, posX, posY }
    });
    res.status(201).json(novoModulo);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar módulo." });
  }
};

// 2. LISTAR TODOS OS MÓDULOS (Para o professor ver o que existe)
export const listarModulos = async (req: Request, res: Response) => {
  try {
    const modulos = await prisma.modulo.findMany({
      orderBy: { ordem: 'asc' } // Já vem na sequência 1, 2, 3...
    });
    res.status(200).json(modulos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar módulos." });
  }
};

export const criarTarefaNoModulo = async (req: Request, res: Response) => {
  try {
    const { titulo, recompensa, moduloId, salaId } = req.body;

    // O Prisma vai verificar se esse moduloId realmente existe
    const moduloExiste = await prisma.modulo.findUnique({
      where: { id: moduloId }
    });

    if (!moduloExiste) {
      return res.status(404).json({ error: "Você está tentando criar uma tarefa em um módulo que não existe!" });
    }

    const novaTarefa = await prisma.tarefa.create({
      data: {
        titulo,
        recompensa,
        moduloId,
        salaId,
        concluida: false
      }
    });

    return res.status(201).json(novaTarefa);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao criar tarefa." });
  }
};

export const atualizarModulo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { titulo, descricao, ordem, posX, posY } = req.body;

    const moduloAtualizado = await prisma.modulo.update({
      where: { id: id as string },
      data: {
        titulo,
        descricao,
        ordem,
        posX,
        posY
      }
    });

    return res.status(200).json(moduloAtualizado);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao atualizar o módulo. Verifique o ID." });
  }
};