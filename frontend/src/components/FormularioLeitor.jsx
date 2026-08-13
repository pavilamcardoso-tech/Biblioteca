import { useState } from 'react';
import api from '../services/api';

function FormularioLeitor({ aoCadastrar }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [erro, setErro] = useState(null);
  const [enviando, setEnviando] = useState(false);

  function handleSubmit(evento) {
    evento.preventDefault();
    setErro(null);
    setEnviando(true);

    api.post('/leitores', { nome, email, telefone })
      .then((response) => {
        setNome('');
        setEmail('');
        setTelefone('');
        aoCadastrar(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.data.errors) {
          const mensagens = Object.values(error.response.data.errors).flat();
          setErro(mensagens.join(' '));
        } else {
          setErro('Erro ao cadastrar leitor.');
        }
        console.error(error);
      })
      .finally(() => setEnviando(false));
  }

  return (
    <form onSubmit={handleSubmit} className="card-form">
      <h2>Cadastrar novo leitor</h2>

      {erro && <p className="error-msg">{erro}</p>}

      <div className="form-fields">
        <div className="form-row">
          <label>Nome</label>
          <input value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>

        <div className="form-row">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="form-row">
          <label>Telefone</label>
          <input value={telefone} onChange={(e) => setTelefone(e.target.value)} />
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

export default FormularioLeitor;