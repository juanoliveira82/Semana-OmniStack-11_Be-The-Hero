// Criação da tabela Incidents (casos).
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function(table) {
        // Cria uma id com auto incremento.
        table.increments();        
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();
    
        // Chave estrangeira da tabela Ongs.
        table.string('ong_id').notNullable();
        table.foreign('ong_id').references('id').inTable('ongs');
      });
};

// Exclusão da tabela Incidents (casos).
exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};
