import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Cria uma instância de um navegador de pilha (navegação apenas com botões).
const AppStack = createStackNavigator();

// Importa todos os componentes
import Casos from './pages/Casos';
import Detalhes from './pages/Detalhes';

// Componente das Rotas.
function Rotas() {
  // HTML que é retornado quando o componente é renderizado.
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{headerShown: false}}>
        <AppStack.Screen name="Casos" component={Casos} />
        <AppStack.Screen name="Detalhes" component={Detalhes} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}

// Exporta as Rotas.
export default Rotas;