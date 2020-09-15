// @ts-check

const db = require('../data/db-config');

/**
 * @typedef Data
 * @property {string} secret_password_to_some_underground_bunker
 */

/**
 * @returns {Promise<Data[]>}
 */
const getAll = async () => {
  return await db('some_data');
};

module.exports = {
  getAll,
};
