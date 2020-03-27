const connection = require('../database/connection');

module.exports = {
    // Função utilizada para verificar se a Ong existe.
    async create(request, response) {
        // Obtém o 'id' da Ong que se deseja fazer login através do corpo da requisição.
        const {id} = request.body;

        // Faz a busca pela Ong informada no banco de dados.
        const ong = await connection('ongs').where('id', id).select('nome').first();

        // Verifica se a Ong existe.
        if(!ong) {
            // Caso não exista, retorna uma resposta de erro.
            return response.status(400).json({ error: 'Nenhuma Ong foi encontrada com esse id' });
        }

        // Caso a Ong exista no banco de dados, retorna o nome da mesma.    
        return response.json(ong);
    }
};