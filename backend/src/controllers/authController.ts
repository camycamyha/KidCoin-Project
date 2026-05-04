import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = 'seu_segredo_aqui'; 

export const login = async (req: Request, res: Response) => {
  // 1. Recebendo os dados com os nomes corretos do seu schema
  const { login, senha } = req.body; 

  try {
    // 2. Buscando o usuário pelo campo 'login'
    const user = await prisma.user.findUnique({
      where: { login }, 
    });

    // 3. Verificando se o usuário existe
    if (!user) {
      return res.status(401).json({ error: 'Login ou senha inválidos' });
    }

    // 4. Validando a senha usando o campo 'senha' do banco
    const isPasswordValid = await bcrypt.compare(senha, user.senha);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Login ou senha inválidos' });
    }

    // 5. Gerando o Token JWT (incluindo o ID e o Login no corpo do token)
    const token = jwt.sign(
      { userId: user.id, login: user.login },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    // 6. Retorno de sucesso (usando 'nome' conforme seu schema)
    return res.status(200).json({
      message: 'Login realizado com sucesso!',
      token,
      user: {
        id: user.id,
        nome: user.nome, 
        login: user.login,
        tipo: user.tipo // Útil para o Front-end saber se é Aluno ou Professor
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
};