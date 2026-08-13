import api from '../services/api';

function ListaEmprestimos({ emprestimos, aoDevolver }) {
  function devolver(id) {
    api.patch(`/emprestimos/${id}/devolver`)
      .then((response) => aoDevolver(response.data))
      .catch((error) => {
        console.error(error);
        alert('Erro ao registrar devolução.');
      });
  }

  return (
    <div>
      <h1 className="app-title" style={{ fontSize: '1.4rem', marginBottom: '1.25rem' }}>Empréstimos</h1>
      <table className="data-table">
        <thead>
          <tr>
            <th>Livro</th>
            <th>Leitor</th>
            <th>Emprestado em</th>
            <th>Devolução prevista</th>
            <th>Devolvido em</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {emprestimos.map((emp) => (
            <tr key={emp.id}>
              <td className="col-text">{emp.livro?.titulo}</td>
              <td className="col-text">{emp.leitor?.nome}</td>
              <td>{emp.data_emprestimo}</td>
              <td>{emp.data_prevista_devolucao}</td>
              <td>
                {emp.data_devolucao ? (
                  <span className="badge badge-returned">devolvido em {emp.data_devolucao}</span>
                ) : (
                  '—'
                )}
              </td>
              <td>
                {!emp.data_devolucao && (
                  <button className="btn btn-secondary btn-small" onClick={() => devolver(emp.id)}>
                    Marcar como devolvido
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaEmprestimos;