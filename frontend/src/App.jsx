import { useEffect, useState } from 'react';
import api from './services/api';
import ListaLivros from './components/ListaLivros';
import FormularioLivro from './components/FormularioLivro';
import ListaLeitores from './components/ListaLeitores';
import FormularioLeitor from './components/FormularioLeitor';
import ListaEmprestimos from './components/ListaEmprestimos';
import FormularioEmprestimo from './components/FormularioEmprestimo';

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
    // Atualiza a quantidade disponível do livro na tela sem precisar recarregar
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

  if (carregando) return <p style={{ padding: '2rem' }}>Carregando sistema...</p>;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
      <nav style={{ marginBottom: '2rem' }}>
        <button onClick={() => setAba('livros')} disabled={aba === 'livros'}>Livros</button>{' '}
        <button onClick={() => setAba('leitores')} disabled={aba === 'leitores'}>Leitores</button>{' '}
        <button onClick={() => setAba('emprestimos')} disabled={aba === 'emprestimos'}>Empréstimos</button>
      </nav>

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
  );
}

export default App;