import { ControleEditora } from "@/classes/controle/ControleEditora";
import { Livro } from "@/classes/modelo/Livro";

interface LinhaLivroProps {
  livro: Livro;
  excluir: (codigo: number) => void;
}

export const LinhaLivro: React.FC<LinhaLivroProps> = (props) => {
  const controleEditora = new ControleEditora();

  const { livro, excluir } = props;

  const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);

  return (
    <tr>
      <td className="d-flex flex-column">
        {livro.titulo}
        <button className="btn btn-sm w-25 btn-danger" onClick={() => excluir(livro.codigo)}>Excluir</button>
      </td>
      <td>{livro.resumo}</td>
      <td>{nomeEditora}</td>
      <td>
        <ul>
          {livro.autores.map((autor, index) => <li key={index}>{autor}</li>)}
        </ul>
      </td>
    </tr>
  );
};