const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    // Função para listar todas as Ong's no banco de dados.
    async index(request, response) {
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    // Função para criar uma nova Ong.
    async create(request, response) {
        const { name, email, whatsapp, city, uf} = request.body;
        const id = crypto.randomBytes(4).toString('HEX');

        // Insere uma nova ong e retorna o 'id' da mesma.
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })

        // Retorna o 'id' da ong inserida.
        return response.json({id});
    }

}