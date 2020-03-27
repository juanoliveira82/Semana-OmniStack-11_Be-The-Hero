import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

// Impora os ícones necessários do pacote "feather icon", utilizando o react icons.
import {FiArrowLeft} from 'react-icons/fi';

// Importa a Api do back-end criada com o axios.
import api from '../../services/api';

// Importa o estilo da página em css, e as imagens utilizadas.
import './styles.css';
import logoImg from '../../assets/logo.svg';

// Componente de Registro.
function Registrar() {
  // Cria um estado para armazenar cada entrada de formulário.
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');

  // Obtém a instância do histórico.
  const history = useHistory();

  async function handleRegistrar(event) {
    // Impede o navegador de recarregar a página.
    event.preventDefault();

    // Obtém dados de entrada do formulário.
    const data = {
      nome,
      email,
      whatsapp,
      cidade,
      uf
    };

    try {
      // Tenta criar uma nova Ong.
      const response = await api.post('/ongs', data);
      alert(`Seu ID de acesso: ${response.data.id}`);

      // Redireciona o usuário para a página de login.
      history.push('/');
    } catch (error) {
      alert('Erro no cadastro, tente novamente!');
    }
  }

  // HTML que é retornado quando o componente é renderizado.  
  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#e02041"/>
            Voltar para o logon
          </Link>
        </section>
        <form onSubmit={handleRegistrar}>
          <input
            placeholder="Nome da ONG"
            value={nome}
            onChange={e => setNome(e.target.value)} 
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)} 
          />
          <input
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)} 
          />
          <div className="input-group">
            <input
              placeholder="Cidade"
              value={cidade}
              onChange={e => setCidade(e.target.value)} 
            />
            <input
              placeholder="UF"
              style={{width: 80}}
              value={uf}
              onChange={e => setUf(e.target.value)}
            />
          </div>
          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

// Exporta o componente.
export default Registrar;