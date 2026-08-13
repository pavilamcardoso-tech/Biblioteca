import api from '../services/api';

function ListaEmprestimos({ emprestimos, aoDevolver }) {
  function devolver(id) {
    api.patch(`/emprestimos/${id}/devolver`)
      .then((response) => {
        aoDevolver(response.data);
      })
      .catch((error) => {
        console.error(error);
        alert('Erro ao registrar devolução.');
      });
  }

  return (
    <div>
      <h1>Empréstimos</h1>
      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
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
              <td>{emp.livro?.titulo}</td>
              <td>{emp.leitor?.nome}</td>
              <td>{emp.data_emprestimo}</td>
              <td>{emp.data_prevista_devolucao}</td>
              <td>{emp.data_devolucao || '—'}</td>
              <td>
                {!emp.data_devolucao && (
                  <button onClick={() => devolver(emp.id)}>Marcar como devolvido</button>
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