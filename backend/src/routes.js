const express = require ('express');
const ong_controller = require ('./controllers/ong_controller');
const incident_controller = require ('./controllers/incident_controller');
const profile_controller = require ('./controllers/profile_controller');
const session_controller = require ('./controllers/session_controller');

const routes = express.Router();

// Rota utilizada para listar todas as Ong's do banco de dados.
routes.get('/ongs', ong_controller.index); 
// Rota utilizada para criar uma nova Ong.
routes.post('/ongs', ong_controller.create); 

// Rota utilizada para listar todos os casos do banco de dados.
routes.get('/incidents', incident_controller.index); 
// Rota utilizada para criar um novo caso.
routes.post('/incidents', incident_controller.create);
// Rota utilizada para excluir um caso do banco de dados.
routes.delete('/incidents/:id', incident_controller.delete);

// Rota utilizada para fazer login.
routes.post('/sessions', session_controller.create); 

// Rota utilizada para listar todos os casos de uma Ong.
routes.get('/profile', profile_controller.index); 

module.exports = routes;