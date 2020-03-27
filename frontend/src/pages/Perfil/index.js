import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

// Impora os ícones necessários do pacote "feather icon", utilizando o react icons.
import {FiPower, FiTrash2} from 'react-icons/fi';

// Importa a Api do back-end criada com o axios.
import api from '../../services/api';

// Importa o estilo da página em css, e as imagens utilizadas.
import './styles.css';
import logoImg from '../../assets/logo.svg';

// Componente de Perfil.
function Perfil() {
  // Obtém o 'id' e o nome da Ong do armazenamento local do navegador.
  const ongId = localStorage.getItem('ongId');  
  const ongNome = localStorage.getItem('ongNome');

  // Cria um estado para armazenar cada caso daquela Ong.
  const [casos, setCasos] = useState([]);

  // Obtém a instância do histórico.
  const history = useHistory();

  /**
   * useEffect is a function that is called when something changes,
   * in this case, when ngoId change. So it's just called once in the app.
   */
  useEffect(() => {
    // Gets all incidents from the specific ngo
    api.get('/perfil', {
      headers: {
        Authorization: ongId
      }
    }).then(response => { // And then stores the incidents into incidents state
      setCasos(response.data);
    });
  }, [ongId]);

  // Function called when you click the delete button
  async function handleExcluirCaso(id) {
    try {
      // Tries to delete the specific incident
      await api.delete(`/casos/${id}`, {
        headers: {
          Authorization: ongId
        }
      });

      // And updates incidents state
      setCasos(casos.filter(caso => caso.id !== id));
    } catch (error) {
      alert('Erro ao deletar o caso, tente novamente!');
    }
  }

  // Função utilizada para fazer logout do sistema.
  function handleLogout() {
    // Limpa o armazenamento local.
    localStorage.clear();

    // E redireciona o usuário para a página de login.
    history.push('/');
  }

  // HTML que é retornado quando o componente é renderizado.  
  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Bem vindo(a), {ongNome}</span>
        <Link className="button" to="/casos/novo">Cadastrar um novo caso</Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#e02041" />
        </button>
      </header>
      <h1>Casos cadastrados</h1>
      {casos.length === 0 && <h2>Você não tem nenhum caso cadastrado :(</h2>}
      <ul>
        {casos.map(caso => {
          return (
            <li key={caso.id}>
              <strong>CASO:</strong>
              <p>{caso.titulo}</p>
              <strong>DESCRIÇÃO:</strong>
              <p>{caso.descricao}</p>
              <strong>VALOR:</strong>
              <p>
                {
                  /*
                  * Intl is a global function from javascript which formats
                  * numbers, in this case into BRL currency.
                  */
                  Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(caso.valor)
                }
              </p>              
              <button onClick={() => handleExcluirCaso(caso.id)} type="button">
                <FiTrash2 size={20} color="#a8a8b3" />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// Exporta o componente.
export default Perfil;