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
    // 1. Buscamos todos os registros que são do tipo Aluno
    const listaGeralDeAlunos = await prisma.usuario.findMany({
      where: { 
        tipo: "Aluno" 
      }
    });

    // 2. Filtramos no JavaScript para garantir que pegamos apenas os sem salaId
    // O "!" antes de aluno.salaId verifica se o campo está vazio, null ou undefined
    const disponiveis = listaGeralDeAlunos.filter(aluno => !aluno.salaId);

    // 3. Retornamos a lista filtrada
    return res.status(200).json(disponiveis);

  } catch (error) {
    console.error("Erro ao listar alunos:", error);
    return res.status(500).json({ error: "Erro ao buscar lista de alunos." });
  }
};

export const listarAlunosDaSala = async (req: Request, res: Response): Promise<any> => {
  try {
    const salaId = req.params.salaId as string;
    
    // Verificamos se o ID foi passado
    if (!salaId) {
      return res.status(400).json({ error: "ID da sala é obrigatório." });
    }

    const alunos = await prisma.usuario.findMany({
      where: {
        tipo: "Aluno",
        salaId: salaId,
      }
    });

    return res.status(200).json(alunos);
  } catch (error) {
    console.error("Erro no Controller:", error);
    return res.status(500).json({ error: "Erro ao buscar alunos desta sala." });
  }
};

// Rota do Mapa (Estilo Mario Bros)
export const getMapaAluno = async (req: Request, res: Response) => {
  try {
    const usuarioId = req.params.usuarioId as string;

    const aluno = await prisma.usuario.findUnique({
      where: { id: usuarioId },
      select: { salaId: true }
    });

    if (!aluno || !aluno.salaId) {
      return res.status(404).json({ error: "Aluno sem sala ou não encontrado." });
    }

    const salaComModulos = await prisma.sala.findUnique({
      where: { id: aluno.salaId },
      include: { modulos: { orderBy: { ordem: 'asc' } } }
    });

    return res.status(200).json(salaComModulos?.modulos || []);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao carregar o mapa." });
  }
};

// Rota para o Professor Liberar a "Fase" (Módulo)
export const liberarModuloParaSala = async (req: Request, res: Response) => {
  try {
    const { salaId, moduloId } = req.body;
    await prisma.sala.update({
      where: { id: salaId },
      data: { moduloIds: { push: moduloId } }
    });
    return res.status(200).json({ message: "Módulo liberado com sucesso!" });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao liberar módulo." });
  }
};

export const deletarSalaPorNome = async (req: Request, res: Response) => {
  try {
    // Forçamos o TS a entender que 'nome' é apenas UMA string
    const nome = req.params.nome as string;

    const resultado = await prisma.sala.deleteMany({
      where: {
        nome: nome
      }
    });

    // Se o count for 0, significa que não achou nenhuma sala com esse nome
    if (resultado.count === 0) {
      return res.status(404).json({ message: "Nenhuma sala encontrada com esse nome." });
    }

    return res.status(200).json({ message: `Sala '${nome}' deletada com sucesso!` });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao deletar a sala." });
  }
};