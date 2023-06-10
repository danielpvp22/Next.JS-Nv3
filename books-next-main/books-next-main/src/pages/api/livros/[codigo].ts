import { NextApiRequest, NextApiResponse } from 'next';
import { controleLivros } from '.';

export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'DELETE') {
      const codigoLivro = req.query.codigo; 
      controleLivros.excluir(Number(codigoLivro));
      res.status(200).json({ mensagem: 'Livro excluído com sucesso' });
    } else {
      res.status(405).end();
    }
  } catch(err) {
    console.log(err)
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};