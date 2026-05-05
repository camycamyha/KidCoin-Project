import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'kidcoin_secret_2026'; // Deve ser a mesma chave usada no Login

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // 1. Pega o token que vem no cabeçalho (Authorization Header)
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido. Por favor, faça login. 🎫' });
  }

  // O formato costuma ser "Bearer TOKEN", por isso dividimos a string
  const parts = authHeader.split(' ');
  
  if (parts.length !== 2) {
    return res.status(401).json({ error: 'Erro no formato do token.' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: 'Token malformado.' });
  }

  // 2. Verifica se o token é válido
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // 3. Salva os dados do usuário dentro da requisição para usar depois
    // Assim, o próximo passo (Controller) já sabe quem é o usuário
    (req as any).user = decoded;

    return next(); // "Passa o bastão" para o próximo passo (o Controller)
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido ou expirado. 🚫' });
  }
};       