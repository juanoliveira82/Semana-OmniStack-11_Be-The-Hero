const connection = require('../database/connection');

module.exports = {
    // Função para listar todos os casos no banco de dados.
    async index(request, response) {
        const {page = 1} = request.query;

        // Conta cada caso no banco de dados.
        const [count] = await connection('casos').count();

        // Retorna 5 casos por página.
        const casos = await connection('casos')
            .join('ongs', 'ongs.id', '=', 'casos.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select(['casos.*', 'ongs.nome', 'ongs.whatsapp', 'ongs.email', 'ongs.cidade', 'ongs.uf']);

        // Cria um header que retorna o número total de casos cadastrados.
        response.header('X-Total-Count', count['count(*)']);

        // Retorna os casos, e o número de casos cadastrados.
        return response.json(casos);
    },

    // Função para criar um novo caso.
    async create(request, response) {
        const ong_id = request.headers.authorization;
        const { titulo, descricao, valor } = request.body;

        // Insere um novo caso e retorna o 'id' do mesmo.
        const [id] = await connection('casos').insert({
            titulo,
            descricao,
            valor,
            ong_id
        });

        // Retorna o 'id' do caso inserido.
        return response.json({id});
    },

    // Função para excluir um caso do banco de dados.
    async delete(request, response) {
        // Obtém o 'id' do caso informado para exclusão, e da Ong logada no sistema.
        const {id} = request.params;
        const ong_id = request.headers.authorization;

        // Obtém o caso correspondente ao 'id' do caso informado.
        const caso = await connection('casos')
            .where('id', id).select('ong_id').first();

        // Verifica se o caso existe no banco.
        if (!caso) {
            // Caso não exista, retorna uma resposta de erro.
            return response.status(404).json({ error: 'Esse caso não existe' });
        }

        // Verifica se a Ong logada no sistema possui o caso informado.
        if (caso.ong_id !== ong_id) {
            /* Caso a Ong não possua o caso, retorna uma mensagem
               de erro, impossibilitando a exclusão do caso. */
            return response.status(401).json({ error: 'Operação não permitida.' });
        }

        // Caso a Ong possua o caso informado, exclui o caso do banco de dados.
        await connection('casos').where('id', id).delete();

        // Retorna uma resposta de "sucesso" porém sem conteúdo.
        return response.status(204).send();
    }
};