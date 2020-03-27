import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Imports all components
import Logon from './pages/Logon';
import Registrar from './pages/Registrar';
import Perfil from './pages/Perfil';
import NovoCaso from './pages/NovoCaso';

function Routes() {
  return (
    // BrowserRouter is the main route component, it will alway gonna be outside everything
    <BrowserRouter>
      {/**
       * Switch is a component that ensures that only one route is executed at the same time
       */}
      <Switch>
        {/**
         * All routes from the frontend
         */}
        <Route path="/" exact component={Logon} />
        <Route path="/register" component={Registrar} />
        <Route path="/profile" component={Perfil} />
        <Route path="/incidents/novo" component={NovoCaso} />
      </Switch>
    </BrowserRouter>
  );
}

// Exports routes
export default Routes;