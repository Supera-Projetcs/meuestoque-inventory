module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: '123yas',
      database: 'inventory'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

};
