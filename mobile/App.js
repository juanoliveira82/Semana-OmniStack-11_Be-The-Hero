import React from 'react';

import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

// Importa as rotas da aplicação.
import Routes from './src/routes';

// Componente do App.
function App() {
  // HTML que é retornado quando o componente é renderizado.
  return (
    <Routes />
  );
}

// Exporta o App.
export default App;
