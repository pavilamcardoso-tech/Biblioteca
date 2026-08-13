import { useState } from 'react';
import api from '../services/api';

function FormularioLivro({ aoCadastrar }) {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [quantidadeTotal, setQuantidadeTotal] = useState(1);
  const [erro, setErro] = useState(null);
  const [enviando, setEnviando] = useState(false);

  function handleSubmit(evento) {
    evento.preventDefault();
    setErro(null);
    setEnviando(true);

    api.post('/livros', {
      titulo,
      autor,
      isbn,
      quantidade_total: quantidadeTotal,
    })
      .then((response) => {
        setTitulo('');
        setAutor('');
        setIsbn('');
        setQuantidadeTotal(1);
        aoCadastrar(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.data.errors) {
          const mensagens = Object.values(error.response.data.errors).flat();
          setErro(mensagens.join(' '));
        } else {
          setErro('Erro ao cadastrar livro.');
        }
        console.error(error);
      })
      .finally(() => setEnviando(false));
  }

  return (
    <form onSubmit={handleSubmit} className="card-form">
      <h2>Cadastrar novo livro</h2>

      {erro && <p className="error-msg">{erro}</p>}

      <div className="form-fields">
        <div className="form-row">
          <label>Título</label>
          <input value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
        </div>

        <div className="form-row">
          <label>Autor</label>
          <input value={autor} onChange={(e) => setAutor(e.target.value)} required />
        </div>

        <div className="form-row">
          <label>ISBN</label>
          <input value={isbn} onChange={(e) => setIsbn(e.target.value)} required />
        </div>

        <div className="form-row">
          <label>Quantidade total</label>
          <input
            type="number"
            min="1"
            value={quantidadeTotal}
            onChange={(e) => setQuantidadeTotal(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={enviando}>
          {enviando ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </div>
    </form>
  );
}

export default FormularioLivro;