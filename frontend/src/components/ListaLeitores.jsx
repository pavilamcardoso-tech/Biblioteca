import { useState } from 'react';
import api from '../services/api';

function ListaLeitores({ leitores, aoAtualizar, aoExcluir }) {
  const [editandoId, setEditandoId] = useState(null);
  const [dadosEdicao, setDadosEdicao] = useState({});
  const [erro, setErro] = useState(null);

  function iniciarEdicao(leitor) {
    setEditandoId(leitor.id);
    setDadosEdicao({
      nome: leitor.nome,
      email: leitor.email || '',
      telefone: leitor.telefone || '',
    });
    setErro(null);
  }

  function cancelarEdicao() {
    setEditandoId(null);
    setErro(null);
  }

  function salvarEdicao(id) {
    api.put(`/leitores/${id}`, dadosEdicao)
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

  function excluirLeitor(id) {
    const confirmar = window.confirm('Tem certeza que deseja excluir este leitor?');
    if (!confirmar) return;

    api.delete(`/leitores/${id}`)
      .then(() => {
        aoExcluir(id);
      })
      .catch((error) => {
        console.error(error);
        alert('Erro ao excluir leitor.');
      });
  }

  return (
    <div>
      <h1>Leitores cadastrados</h1>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {leitores.map((leitor) => (
            <tr key={leitor.id}>
              {editandoId === leitor.id ? (
                <>
                  <td>{leitor.id}</td>
                  <td>
                    <input
                      value={dadosEdicao.nome}
                      onChange={(e) => setDadosEdicao({ ...dadosEdicao, nome: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      value={dadosEdicao.email}
                      onChange={(e) => setDadosEdicao({ ...dadosEdicao, email: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      value={dadosEdicao.telefone}
                      onChange={(e) => setDadosEdicao({ ...dadosEdicao, telefone: e.target.value })}
                    />
                  </td>
                  <td>
                    <button onClick={() => salvarEdicao(leitor.id)}>Salvar</button>
                    <button onClick={cancelarEdicao}>Cancelar</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{leitor.id}</td>
                  <td>{leitor.nome}</td>
                  <td>{leitor.email}</td>
                  <td>{leitor.telefone}</td>
                  <td>
                    <button onClick={() => iniciarEdicao(leitor)}>Editar</button>
                    <button onClick={() => excluirLeitor(leitor.id)}>Excluir</button>
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

export default ListaLeitores;