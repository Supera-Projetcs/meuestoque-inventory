module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: '123mepep',
      database: 'inventory'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

};
