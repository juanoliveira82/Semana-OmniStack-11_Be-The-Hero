import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';

// Impora os ícones necessários do pacote "feather icon", utilizando o react icons.
import {FiLogIn} from 'react-icons/fi';

// Imports backend api created with axios
import api from '../../services/api';

// Importa o estilo da página em css, e as imagens utilizadas.
import './styles.css';
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

// Componente de Logon.
function Logon() {
    // Creates a state for each form input
    const [id, setId] = useState('');

    // Gets history instance
    const history = useHistory();

    // Function called when you click the login button
    async function handleLogon(event) {
        // Prevents the browser reload
        event.preventDefault();

        try {
            // Tries to create a session
            const response = await api.post('/sessao', { id });

            // Stores id and name from ngo into the browser's local storage
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongNome', response.data.nome);

            // Redirects user to profile page
            history.push('/perfil');
        } catch (error) {
            alert('Erro no login, tente novamente!');
        }
    }

    // Html returned when the component is rendered
    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero" />
                <form onSubmit={handleLogon}>
                    <h1>Faça seu logon</h1>
                    <input
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>
                    <Link className="back-link" to="/registrar">
                        <FiLogIn size={16} color="#e02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes" />
        </div>
    );
}

// Exporta o componente.
export default Logon;