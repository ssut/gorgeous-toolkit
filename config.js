require('dotenv').config();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const getEnv = env => process.env[env.toUpperCase()] || '';

const config = Object.freeze({

  app: {
    port: Number(getEnv('port')) || 3000,
  },

});

module.exports = config;
