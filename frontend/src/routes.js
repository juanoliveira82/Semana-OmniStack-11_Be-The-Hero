import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

// Importa as páginas.
import Logon      from './pages/Logon';
import Registrar  from './pages/Registrar';
import Perfil     from './pages/Perfil';
import NovoCaso   from './pages/NovoCaso';

function Routes() {
  return (
    /*
      O BrowserRouter é o componente principal para direcionar as rotas.
        O Switch garante que apenas uma rota seja executada por momento.
          Dentro do switch ficam todas as rotas usadas no front-end.
    */
    <BrowserRouter>     
      <Switch>       
        <Route path="/" exact component={Logon} />
        <Route path="/registrar"  component={Registrar} />
        <Route path="/perfil"     component={Perfil} />
        <Route path="/casos/novo" component={NovoCaso} />
      </Switch>
    </BrowserRouter>
  );
}

// Exporta as rotas.
export default Routes;