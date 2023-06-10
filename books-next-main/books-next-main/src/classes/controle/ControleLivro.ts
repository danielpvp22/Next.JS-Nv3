import { Livro } from "../modelo/Livro";

export class ControleLivros {
  private livros: Array<Livro> = [
    { 
      codEditora: 1, 
      codigo: 1, 
      titulo: 'Teste', 
      resumo: 'test test', 
      autores: ['Testando', 'Testando Auxiliar'] 
    },
    { 
      codEditora: 2, 
      codigo: 2, 
      titulo: 'Teste2', 
      resumo: 'test test2', 
      autores: ['Testando2', 'Testando Auxiliar2'] 
    },
    { 
      codEditora: 3, 
      codigo: 3, 
      titulo: 'Teste3', 
      resumo: 'test test3', 
      autores: ['Testando3', 'Testando Auxiliar3'] 
    },
  ];

  constructor() {}

  public obterLivros() {
    return this.livros;
  }

  public incluir(livro: Omit<Livro, 'codigo'>) {
    const lastBook = this.livros[this.livros.length - 1];
    this.livros.push({ ...livro, codigo: lastBook.codigo + 1 });
  }

  public excluir(codigo: number) {
    const findBookIndex = this.livros.findIndex(livro => livro.codigo === codigo);

    this.livros.splice(findBookIndex, 1);
  }
}