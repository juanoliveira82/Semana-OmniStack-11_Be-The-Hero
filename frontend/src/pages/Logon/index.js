import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';

// Impora o ícone de login do pacote "feather icon", utilizando o react icons.
import {FiLogIn} from 'react-icons/fi';

// Imports backend api created with axios
import api from '../../services/api';

// Importa o estilo da página em css, e as imagens utilizadas.
import './styles.css';
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

// Logon component
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
            const response = await api.post('/sessions', { id });

            // Stores id and name from ngo into the browser's local storage
            localStorage.setItem('ngoId', id);
            localStorage.setItem('ngoName', response.data.name);

            // Redirects user to profile page
            history.push('/profile');
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
                        onChange={e => setId(e.target.value)} // Updates component state when changed
                    />
                    <button className="button" type="submit">Entrar</button>

                    {/** 
                     * Link: it's just a component similar to the HTML <a> tag,
                     * but in this case, it prevents the browser from reloading
                     * 
                     * FiLogIn: it's an icon in a component format, this icon was
                     * imported from feather icons pack
                    */}
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#e02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes" />
        </div>
    );
}

// Exports component
export default Logon;