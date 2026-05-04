import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const cadastrarUsuario = async (req: Request, res: Response) => {
  // 1. Recebendo apenas o que é essencial agora
  const { nome, login, senha, tipo } = req.body;

  try {
    // 2. Validação de Regra de Negócio: Tipo Obrigatório
    if (!tipo || (tipo !== "ALUNO" && tipo !== "PROFESSOR")) {
      return res.status(400).json({ 
        error: "Escolha obrigatória: Você precisa selecionar se é ALUNO ou PROFESSOR. 😊" 
      });
    }

    // 3. Verificação de segurança: E-mail/Login duplicado
    const usuarioExistente = await prisma.user.findUnique({
      where: { login }
    });

    if (usuarioExistente) {
      return res.status(400).json({ error: "Este e-mail já está cadastrado no KidCoin." });
    }

    // 4. Criptografando a senha para segurança (Health 4.0/Fintech)
    const hashedSenha = await bcrypt.hash(senha, 10);

    // 5. Criando o usuário no MongoDB via Prisma
    const novoUsuario = await prisma.user.create({
      data: {
        nome: nome,
        login: login,
        senha: hashedSenha,
        tipo: tipo, 
      }
    });

    // 6. Resposta de sucesso (não devolvemos a senha por segurança)
    return res.status(201).json({ 
      message: `${tipo === "ALUNO" ? "Aluno" : "Professor"} cadastrado com sucesso!`, 
      user: { 
        id: novoUsuario.id, 
        nome: novoUsuario.nome, 
        login: novoUsuario.login,
        tipo: novoUsuario.tipo
      } 
    });

  } catch (error) {
    console.error("Erro no cadastro:", error);
    return res.status(500).json({ 
      error: "Ops! Tivemos um erro interno ao tentar realizar seu cadastro." 
    });
  }
};