import { NextPage } from "next";
import styles from '../styles/Home.module.css';
import { Livro } from "@/classes/modelo/Livro";
import { useEffect, useState } from "react";
import Head from "next/head";
import { Menu } from "@/components/Menu";
import { ControleEditora } from "@/classes/controle/ControleEditora";
import { useRouter } from "next/router";
import { ControleLivros } from "@/classes/controle/ControleLivro";

const LivroDados: NextPage = () => {
  const controleEditora = new ControleEditora();

  const opcoes = controleEditora.getEditoras().map(editora => ({ value: editora.codEditora, text: editora.nome }));
  const baseURL = "http://localhost:3000/api/livros";
 
  const [titulo, setTitulo] = useState('');
  const [resumo, setResumo] = useState('');
  const [autores, setAutores] = useState('');
  const [codEditora, setCodEditora] = useState(opcoes[0].value);
  
  const router = useRouter();

  const tratarCombo = (evento: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = evento.target.value;

    setCodEditora(Number(selectedValue));
  };

  const incluirLivro = async (livro: Livro) => {
    try {
      const response = await fetch(baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(livro),
      });
  
      return response.ok;
    } catch (error) {
      console.error('Erro ao incluir o livro:', error);
      return false;
    }
  };

  const incluir = (evento: React.FormEvent<HTMLFormElement>) => {
    const controleLivro = new ControleLivros();

    const livros = controleLivro.obterLivros();

    evento.preventDefault();

    const newLivro = {
      codigo: livros[livros.length - 1].codigo + 1,
      titulo,
      resumo,
      autores: autores.split('\n'),
      codEditora,
    };
    
    incluirLivro(newLivro);

    router.push('/LivroLista');
  };

  return (
    <div className={`${styles.container}`}>
      <Head>
        <title>Loja Next</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Menu />
      <main className="container">
        <h1>Inclusão de Livro</h1>

        <form onSubmit={incluir}>
          <div className="form-group">
            <label htmlFor="tituloInput">Título:</label>
            <input type="text" className="form-control" id="tituloInput" required name="titulo" onChange={e => setTitulo(e.target.value)}/>
          </div>

          <div className="form-group">
            <label htmlFor="resumoTextarea">Resumo:</label>
            <textarea className="form-control" id="resumoTextarea" name="resumo" onChange={e => setResumo(e.target.value)}></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="editoraSelect">Editora:</label>
            <select className="form-control" id="editoraSelect" required name="codEditora" onChange={e => tratarCombo(e)}>
              <option value="Selecione uma editora" disabled selected>Selecione uma editora</option>
              {opcoes.map((opcao, index) => <option key={index} value={opcao.value}>{opcao.text}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="autoresTextarea">Autores:</label>
            <textarea className="form-control" id="autoresTextarea" name="autoresForm" onChange={e => setAutores(e.target.value)}></textarea>
          </div>

          <button type="submit" className="btn btn-primary">Incluir</button>
        </form>
      </main>
    </div>
  ); 
};

export default LivroDados;