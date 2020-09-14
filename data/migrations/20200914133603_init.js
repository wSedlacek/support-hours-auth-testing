exports.up = async function (knex) {
  await knex.schema.createTable('users', (tbl) => {
    tbl.increments('id');
    tbl.string('username').unique().notNullable();
    tbl.string('password').notNullable();
  });

  await knex.schema.createTable('some_data', (tbl) => {
    tbl.increments('id');
    tbl.string('secret_password_to_some_underground_bunker');
  });
};

exports.down = async function (knex) {
  await knex.schema.dropSchemaIfExists('some_data');
  await knex.schema.dropSchemaIfExists('users');
};
