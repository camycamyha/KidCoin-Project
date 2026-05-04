import { Router } from 'express';
import { cadastrarUsuario } from '../controllers/UserController'; // Verifique o nome da função!

const router = Router();

// Ajustamos para ser apenas '/cadastrar' porque o prefixo já está no server.ts
router.post('/cadastrar', cadastrarUsuario); 

export default router;