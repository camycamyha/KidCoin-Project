import { Router } from 'express';
import { cadastrarUsuario, concluirTarefa } from '../controllers/UserController'; // Verifique o nome da função!
import { criarTarefaNoModulo } from '../controllers/ModuloController';
import { authMiddleware } from '../middlewares/authMiddlewares';


const router = Router();

// Ajustamos para ser apenas '/cadastrar' porque o prefixo já está no server.ts
router.post('/cadastrar', cadastrarUsuario); 
router.post('/concluir-tarefa', concluirTarefa);
router.post('/tarefas', criarTarefaNoModulo);

//Rotas protegidas
router.get('/perfil', authMiddleware, (req, res) => {
  res.json({ message: "Você está logado!", dados: (req as any).user });
});
export default router;