import  express from 'express';
import { Request, Response } from 'express';

const app = express();
app.use(express.json());

const PORT = 3001;

// Interface para tipar o que recebemos da API principal
interface LogPayload {
  mensagem: string;
  usuario: string;
  moedas?: number;
}

app.post('/log', (req: Request, res: Response) => {
  const { mensagem, usuario, moedas }: LogPayload = req.body;
  const data = new Date().toLocaleTimeString();

  console.log(`[${data}] 🔔 EVENTO RECEBIDO`);
  console.log(`> Aluno: ${usuario}`);
  console.log(`> Ação: ${mensagem}`);
  if (moedas) console.log(`> Recompensa: +${moedas} KidCoins`);
  console.log(`-----------------------------------`);

  return res.status(200).json({ 
    success: true, 
    message: "Log processado pelo Microsserviço" 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Microsserviço TS rodando em http://localhost:${PORT}`);
});