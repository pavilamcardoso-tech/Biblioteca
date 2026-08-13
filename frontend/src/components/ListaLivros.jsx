import { useState } from 'react';
import api from '../services/api';

function ListaLivros({ livros, aoAtualizar, aoExcluir }) {
  const [editandoId, setEditandoId] = useState(null);
  const [dadosEdicao, setDadosEdicao] = useState({});
  const [erro, setErro] = useState(null);

  function iniciarEdicao(livro) {
    setEditandoId(livro.id);
    setDadosEdicao({
      titulo: livro.titulo,
      autor: livro.autor,
      isbn: livro.isbn,
      quantidade_total: livro.quantidade_total,
    });
    setErro(null);
  }

  function cancelarEdicao() {
    setEditandoId(null);
    setErro(null);
  }

  function salvarEdicao(id) {
    api.put(`/livros/${id}`, dadosEdicao)
      .then((response) => {
        aoAtualizar(response.data);
        setEditandoId(null);
      })
      .catch((error) => {
        if (error.response && error.response.data.errors) {
          const mensagens = Object.values(error.response.data.errors).flat();
          setErro(mensagens.join(' '));
        } else {
          setErro('Erro ao salvar alterações.');
        }
        console.error(error);
      });
  }

  function excluirLivro(id) {
    const confirmar = window.confirm('Tem certeza que deseja excluir este livro?');
    if (!confirmar) return;

    api.delete(`/livros/${id}`)
      .then(() => aoExcluir(id))
      .catch((error) => {
        console.error(error);
        alert('Erro ao excluir livro.');
      });
  }

  return (
    <div>
      <h1 className="app-title" style={{ fontSize: '1.4rem', marginBottom: '1.25rem' }}>Acervo</h1>
      {erro && <p className="error-msg">{erro}</p>}
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Autor</th>
            <th>ISBN</th>
            <th>Total</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {livros.map((livro) => (
            <tr key={livro.id}>
              {editandoId === livro.id ? (
                <>
                  <td>{livro.id}</td>
                  <td><input className="table-input" value={dadosEdicao.titulo} onChange={(e) => setDadosEdicao({ ...dadosEdicao, titulo: e.target.value })} /></td>
                  <td><input className="table-input" value={dadosEdicao.autor} onChange={(e) => setDadosEdicao({ ...dadosEdicao, autor: e.target.value })} /></td>
                  <td><input className="table-input" value={dadosEdicao.isbn} onChange={(e) => setDadosEdicao({ ...dadosEdicao, isbn: e.target.value })} /></td>
                  <td><input className="table-input" type="number" min="1" value={dadosEdicao.quantidade_total} onChange={(e) => setDadosEdicao({ ...dadosEdicao, quantidade_total: e.target.value })} /></td>
                  <td>{livro.quantidade_disponivel} disp.</td>
                  <td className="actions-cell">
                    <button className="btn btn-primary btn-small" onClick={() => salvarEdicao(livro.id)}>Salvar</button>
                    <button className="btn btn-secondary btn-small" onClick={cancelarEdicao}>Cancelar</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{livro.id}</td>
                  <td className="col-text">{livro.titulo}</td>
                  <td className="col-text">{livro.autor}</td>
                  <td>{livro.isbn}</td>
                  <td>{livro.quantidade_total}</td>
                  <td>
                    <span className={`badge ${livro.quantidade_disponivel > 0 ? 'badge-available' : 'badge-unavailable'}`}>
                      {livro.quantidade_disponivel > 0 ? `${livro.quantidade_disponivel} disponível` : 'indisponível'}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <button className="btn btn-secondary btn-small" onClick={() => iniciarEdicao(livro)}>Editar</button>
                    <button className="btn btn-danger btn-small" onClick={() => excluirLivro(livro.id)}>Excluir</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaLivros;