const express = require ('express');
const ong_controller = require ('./controllers/ong_controller');
const casos_controller = require ('./controllers/casos_controller');
const perfil_controller = require ('./controllers/perfil_controller');
const sessao_controller = require ('./controllers/sessao_controller');

const routes = express.Router();

// Rota utilizada para listar todas as Ong's do banco de dados.
routes.get('/ongs', ong_controller.index); 
// Rota utilizada para criar uma nova Ong.
routes.post('/ongs', ong_controller.create); 

// Rota utilizada para listar todos os casos do banco de dados.
routes.get('/casos', casos_controller.index); 
// Rota utilizada para criar um novo caso.
routes.post('/casos', casos_controller.create);
// Rota utilizada para excluir um caso do banco de dados.
routes.delete('/casos/:id', casos_controller.delete);

// Rota utilizada para fazer login.
routes.post('/sessao', sessao_controller.create); 

// Rota utilizada para listar todos os casos de uma Ong.
routes.get('/perfil', perfil_controller.index); 

module.exports = routes;