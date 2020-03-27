// Criação da tabela Casos.
exports.up = function(knex) {
    return knex.schema.createTable('casos', function(table) {
        // Cria uma id com auto incremento.
        table.increments();        
        table.string('titulo').notNullable();
        table.string('descricao').notNullable();
        table.decimal('valor').notNullable();
    
        // Chave estrangeira da tabela Ongs.
        table.string('ong_id').notNullable();
        table.foreign('ong_id').references('id').inTable('ongs');
      });
};

// Exclusão da tabela Incidents (casos).
exports.down = function(knex) {
    return knex.schema.dropTable('casos');
};
