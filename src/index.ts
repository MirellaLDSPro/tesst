import express, { Request, Response } from 'express';
import contatosRouter from './contatos'; // Importa o roteador de contatos

const app = express();
const port = process.env.PORT || 8080;

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Rota principal
app.get('/', (_req: Request, res: Response) => {
  return res.send('Express Typescript on Vercel');
});

// Rota de ping
app.get('/ping', (_req: Request, res: Response) => {
  return res.send('pong 🏓');
});

// Rota de contatos
app.use('/contatos', contatosRouter);

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});