module.exports = {
  "development": {
    "username": "postgres",
    "password": "admin",
    "database": "stable_coin_compare",
    "host": "localhost",
    "dialect": "postgres",
    "port": 32768
  },
  "test": {
    "username": "postgres",
    "password": "admin",
    "database": "stable_coin_compare_test",
    "host": "localhost",
    "dialect": "postgres",
    "port": 32768
  },
  "production": {
    "database": process.env.DATABASE_NAME,
    "port": process.env.DATABASE_PORT || 32768,
    "username": process.env.DATABASE_USERNAME || 'postgres',
    "password": process.env.DATABASE_PASSWORD || 'admin',
    "host": process.env.DATABASE_HOST || 'localhost',
    "dialect": "postgres"
  }
};
