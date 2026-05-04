import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const cadastrarUsuario = async (req: Request, res: Response) => {
  // 1. Recebendo os dados (usando 'email' conforme o seu Schema)
  const { nome, email, senha, tipo } = req.body;

  try {
    // 2. Validação de Regra de Negócio: Tipo Obrigatório
    if (!tipo || (tipo !== "ALUNO" && tipo !== "PROFESSOR")) {
      return res.status(400).json({ 
        error: "Escolha obrigatória: Você precisa selecionar se é ALUNO ou PROFESSOR. 😊" 
      });
    }

    // 3. Verificação de segurança: E-mail duplicado (usando campo 'email' do Schema)
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email }
    });

    if (usuarioExistente) {
      return res.status(400).json({ error: "Este e-mail já está cadastrado no KidCoin." });
    }

    // 4. Criptografando a senha
    const hashedSenha = await bcrypt.hash(senha, 10);

    // 5. Criando o usuário no MongoDB via Prisma (Modelo 'usuario')
    const novoUsuario = await prisma.usuario.create({
      data: {
        nome: nome,
        email: email, 
        senha: hashedSenha,
        tipo: tipo, 
        saldo: 0
      }
    });

    // 6. Resposta de sucesso
    return res.status(201).json({ 
      message: `${tipo === "ALUNO" ? "Aluno" : "Professor"} cadastrado com sucesso!`, 
      user: { 
        id: novoUsuario.id, 
        nome: novoUsuario.nome, 
        email: novoUsuario.email,
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