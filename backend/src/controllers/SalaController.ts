import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

// Função 1: Criar a Sala
export const criarSala = async (req: Request, res: Response) => {
  const { nome, professorId } = req.body;
  try {
    const codigoUnico = `KID-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
    const novaSala = await prisma.sala.create({
      data: {
        nome,
        codigo: codigoUnico,
        usuarios: { connect: { id: professorId } }
      }
    });
    res.status(201).json(novaSala);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar sala" });
  }
};

// Função 2: Adicionar Aluno Manualmente (A que você pediu!)
export const adicionarAlunoNaSala = async (req: Request, res: Response) => {
  const { alunoId, salaId } = req.body; // IDs que virão do seu clique no Front-end

  try {
    const alunoAtualizado = await prisma.usuario.update({
      where: { id: alunoId },
      data: { salaId: salaId } // Aqui o aluno é incluído automaticamente
    });

    res.status(200).json({ 
      message: "Aluno adicionado com sucesso!", 
      aluno: alunoAtualizado.nome 
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar aluno na sala." });
  }
};

// Função 3: Listar Alunos (Para o professor escolher na lista)
export const listarAlunosSemSala = async (req: Request, res: Response) => {
  try {
    const alunos = await prisma.usuario.findMany({
      where: { 
        tipo: "ALUNO",
        salaId: null // Só mostra quem ainda está "solto"
      }
    });
    res.status(200).json(alunos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar lista de alunos." });
  }
};