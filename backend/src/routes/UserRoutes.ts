import { Router } from 'express';
import { cadastrarUsuario, concluirTarefa } from '../controllers/UserController'; // Verifique o nome da função!
import { criarTarefaNoModulo } from '../controllers/ModuloController';

const router = Router();

// Ajustamos para ser apenas '/cadastrar' porque o prefixo já está no server.ts
router.post('/cadastrar', cadastrarUsuario); 
router.post('/concluir-tarefa', concluirTarefa);
router.post('/tarefas', criarTarefaNoModulo);

export default router;