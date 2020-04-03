const knex = require('knex');
const configuration = require('../../knexfile');


const config = process.env.NODE_ENN == 'teste' ? configuration.test : configuration.development;
const connection = knex(config);

module.exports = connection;