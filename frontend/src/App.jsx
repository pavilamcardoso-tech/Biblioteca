import { useEffect, useState } from 'react';
import api from './services/api';
import ListaLivros from './components/ListaLivros';
import FormularioLivro from './components/FormularioLivro';
import ListaLeitores from './components/ListaLeitores';
import FormularioLeitor from './components/FormularioLeitor';
import ListaEmprestimos from './components/ListaEmprestimos';
import FormularioEmprestimo from './components/FormularioEmprestimo';
import './App.css';

function App() {
  const [aba, setAba] = useState('livros');

  const [livros, setLivros] = useState([]);
  const [leitores, setLeitores] = useState([]);
  const [emprestimos, setEmprestimos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  function buscarTudo() {
    Promise.all([
      api.get('/livros'),
      api.get('/leitores'),
      api.get('/emprestimos'),
    ]).then(([resLivros, resLeitores, resEmprestimos]) => {
      setLivros(resLivros.data);
      setLeitores(resLeitores.data);
      setEmprestimos(resEmprestimos.data);
      setCarregando(false);
    }).catch((error) => {
      console.error(error);
      setCarregando(false);
    });
  }

  useEffect(() => {
    buscarTudo();
  }, []);

  function aoCadastrarLivro(novoLivro) {
    setLivros((atuais) => [...atuais, novoLivro]);
  }
  function aoAtualizarLivro(livroAtualizado) {
    setLivros((atuais) => atuais.map((l) => (l.id === livroAtualizado.id ? livroAtualizado : l)));
  }
  function aoExcluirLivro(id) {
    setLivros((atuais) => atuais.filter((l) => l.id !== id));
  }

  function aoCadastrarLeitor(novoLeitor) {
    setLeitores((atuais) => [...atuais, novoLeitor]);
  }
  function aoAtualizarLeitor(leitorAtualizado) {
    setLeitores((atuais) => atuais.map((l) => (l.id === leitorAtualizado.id ? leitorAtualizado : l)));
  }
  function aoExcluirLeitor(id) {
    setLeitores((atuais) => atuais.filter((l) => l.id !== id));
  }

  function aoCadastrarEmprestimo(novoEmprestimo) {
    setEmprestimos((atuais) => [...atuais, novoEmprestimo]);
    setLivros((atuais) =>
      atuais.map((l) => (l.id === novoEmprestimo.livro_id ? { ...l, quantidade_disponivel: l.quantidade_disponivel - 1 } : l))
    );
  }

  function aoDevolverEmprestimo(emprestimoAtualizado) {
    setEmprestimos((atuais) =>
      atuais.map((e) => (e.id === emprestimoAtualizado.id ? emprestimoAtualizado : e))
    );
    setLivros((atuais) =>
      atuais.map((l) => (l.id === emprestimoAtualizado.livro_id ? { ...l, quantidade_disponivel: l.quantidade_disponivel + 1 } : l))
    );
  }

  if (carregando) return <p className="loading-text">Carregando sistema...</p>;

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="eyebrow">Gestão de Acervo</div>
        <h1 className="app-title">Sistema de Biblioteca</h1>
      </header>

      <nav className="tabs">
        <button className={`tab ${aba === 'livros' ? 'active' : ''}`} onClick={() => setAba('livros')} disabled={aba === 'livros'}>
          Livros
        </button>
        <button className={`tab ${aba === 'leitores' ? 'active' : ''}`} onClick={() => setAba('leitores')} disabled={aba === 'leitores'}>
          Leitores
        </button>
        <button className={`tab ${aba === 'emprestimos' ? 'active' : ''}`} onClick={() => setAba('emprestimos')} disabled={aba === 'emprestimos'}>
          Empréstimos
        </button>
      </nav>

      <div className="panel">
        {aba === 'livros' && (
          <>
            <FormularioLivro aoCadastrar={aoCadastrarLivro} />
            <ListaLivros livros={livros} aoAtualizar={aoAtualizarLivro} aoExcluir={aoExcluirLivro} />
          </>
        )}

        {aba === 'leitores' && (
          <>
            <FormularioLeitor aoCadastrar={aoCadastrarLeitor} />
            <ListaLeitores leitores={leitores} aoAtualizar={aoAtualizarLeitor} aoExcluir={aoExcluirLeitor} />
          </>
        )}

        {aba === 'emprestimos' && (
          <>
            <FormularioEmprestimo livros={livros} leitores={leitores} aoCadastrar={aoCadastrarEmprestimo} />
            <ListaEmprestimos emprestimos={emprestimos} aoDevolver={aoDevolverEmprestimo} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;