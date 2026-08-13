import { useState } from 'react';
import api from '../services/api';

function FormularioEmprestimo({ livros, leitores, aoCadastrar }) {
  const [livroId, setLivroId] = useState('');
  const [leitorId, setLeitorId] = useState('');
  const [dataPrevista, setDataPrevista] = useState('');
  const [erro, setErro] = useState(null);
  const [enviando, setEnviando] = useState(false);

  function handleSubmit(evento) {
    evento.preventDefault();
    setErro(null);
    setEnviando(true);

    api.post('/emprestimos', {
      livro_id: livroId,
      leitor_id: leitorId,
      data_prevista_devolucao: dataPrevista,
    })
      .then((response) => {
        setLivroId('');
        setLeitorId('');
        setDataPrevista('');
        aoCadastrar(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.data.mensagem) {
          setErro(error.response.data.mensagem);
        } else if (error.response && error.response.data.errors) {
          const mensagens = Object.values(error.response.data.errors).flat();
          setErro(mensagens.join(' '));
        } else {
          setErro('Erro ao registrar empréstimo.');
        }
        console.error(error);
      })
      .finally(() => setEnviando(false));
  }

  return (
    <form onSubmit={handleSubmit} className="card-form">
      <h2>Registrar novo empréstimo</h2>

      {erro && <p className="error-msg">{erro}</p>}

      <div className="form-fields">
        <div className="form-row">
          <label>Livro</label>
          <select value={livroId} onChange={(e) => setLivroId(e.target.value)} required>
            <option value="">Selecione um livro</option>
            {livros.map((livro) => (
              <option key={livro.id} value={livro.id} disabled={livro.quantidade_disponivel < 1}>
                {livro.titulo} ({livro.quantidade_disponivel} {livro.quantidade_disponivel === 1 ? 'disponível' : 'disponíveis'})
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label>Leitor</label>
          <select value={leitorId} onChange={(e) => setLeitorId(e.target.value)} required>
            <option value="">Selecione um leitor</option>
            {leitores.map((leitor) => (
              <option key={leitor.id} value={leitor.id}>
                {leitor.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label>Data prevista de devolução</label>
          <input
            type="date"
            value={dataPrevista}
            onChange={(e) => setDataPrevista(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={enviando}>
          {enviando ? 'Registrando...' : 'Registrar empréstimo'}
        </button>
      </div>
    </form>
  );
}

export default FormularioEmprestimo;