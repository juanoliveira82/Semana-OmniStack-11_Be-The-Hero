import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

// Impora os ícones necessários do pacote "feather icon", utilizando o react icons.
import {FiArrowLeft} from 'react-icons/fi';

// Importa a Api do back-end criada com o axios.
import api from '../../services/api';

// Importa o estilo da página em css, e as imagens utilizadas.
import './styles.css';
import logoImg from '../../assets/logo.svg';

// Componente de Novo caso.
function NovoCaso() {
  // Obtém a 'id' da Ong, do armazenamento local do navegador.
  const ongId = localStorage.getItem('ongId');

  // Cria um estado para armazenar cada entrada de formulário.
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');

  // Obtém a instância do histórico.
  const history = useHistory();

  async function handleNovoCaso(event) {
    // Impede o navegador de recarregar a página.
    event.preventDefault();

    // Obtém dados de entrada do formulário.
    const data = {
      titulo,
      descricao,
      valor
    };

    try {
      // Tenta criar um novo caso.
      await api.post('/casos', data, {
        headers: {
          Authorization: ongId
        }
      });

      // Redireciona o usuário para a página do perfil.
      history.push('/perfil');
    } catch (error) {
      alert('Erro ao cadastrar novo caso, tente novamente!');
    }
  }

  // HTML que é retornado quando o componente é renderizado.
  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para a home
          </Link>
        </section>
        <form onSubmit={handleNovoCaso}>
          <input
            placeholder="Título do caso"
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={descricao}
            onChange={e => setDescricao(e.target.value)} 
          />
          <input
            placeholder="Valor em reais"
            value={valor}
            onChange={e => setValor(e.target.value)}
          />
          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

// Exporta o componente.
export default NovoCaso;