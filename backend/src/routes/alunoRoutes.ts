import { Router } from 'express';
import { buscarPerfilAluno } from '../controllers/alunoController';
import { authMiddleware } from '../middlewares/authMiddlewares';


const router = Router();

// O aluno só precisa acessar /meu-progresso e o sistema já sabe quem ele é pelo token
router.get('/meu-progresso', authMiddleware, buscarPerfilAluno);

export default router;