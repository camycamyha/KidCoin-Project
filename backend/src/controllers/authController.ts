import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
// Em produção, use uma variável de ambiente (process.env.JWT_SECRET)
const JWT_SECRET = 'kidcoin_secret_2026'; 

export const login = async (req: Request, res: Response) => {

  const { email, senha } = req.body; 

  try {
    
    const user = await prisma.usuario.findUnique({
      where: { email }, 
    });

    // Verifica se o usuário existe
    if (!user) {
      return res.status(401).json({ error: 'E-mail ou senha inválidos. 😊' });
    }

    // 4. Validando a senha criptografada
    const isPasswordValid = await bcrypt.compare(senha, user.senha);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'E-mail ou senha inválidos. 😊' });
    }

    // 5. Gerando o Token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email, tipo: user.tipo },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    //Retorno completo para o Front-end
    return res.status(200).json({
      message: 'Bem-vindo ao KidCoin!',
      token,
      user: {
        id: user.id,
        nome: user.nome, 
        email: user.email,
        tipo: user.tipo,   // Essencial para abrir o Dashboard correto
        salaId: user.salaId, // Se for null, o sistema sabe que ele ainda não tem sala
        saldo: user.saldo    // Para o aluno já ver quanto tem de KidCoins
      }
    });

  } catch (error) {
    console.error("Erro no Login:", error);
    return res.status(500).json({ error: 'Ops! Tivemos um problema técnico no login.' });
  }
};