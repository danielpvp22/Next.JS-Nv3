import { ControleLivros } from "../../../classes/controle/ControleLivro";

export const controleLivros = new ControleLivros();

export default (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      try {
        const livros = controleLivros.obterLivros();
        res.status(200).json(livros);
        break;
      } catch(err) {
        console.log(err);
        res.status(500).json({ mensagem: 'Erro ao processar a requisição' });
      }
    case 'POST':
      try {
        const livro = req.body;
        const livros = controleLivros.obterLivros();
        controleLivros.incluir({
          ...livro,
          codigo: livros[livros.length - 1].codigo + 1,
        });
        res.status(201).json({ mensagem: 'Livro incluído com sucesso' });
        break;
      } catch(err) {
        console.log(err);
        res.status(500).json({ mensagem: 'Erro ao processar a requisição' });
      }
    default:
      res.status(405).json({ message: 'Método não permitido' });
      break;
  }
};