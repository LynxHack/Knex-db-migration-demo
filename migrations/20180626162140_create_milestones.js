
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('milestones', function(table){
      // table.string('username');
      // table.string('password');
      table.increments('id');
      table.varchar('description').nullable();

      table.date('date_achieved')
    })
  ])  
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('milestones')
  ])  
};
