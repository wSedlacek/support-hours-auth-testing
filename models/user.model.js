// @ts-check

const db = require('../data/db-config');

/**
 * @typedef User
 * @property {string} username
 * @property {string} password
 */

/**
 * @typedef ExistingUser
 * @property {string} id
 * @property {string} username
 * @property {string} password
 */

/**
 *
 * @param {string} id
 * @returns {Promise<ExistingUser>}
 */
const findByID = async (id) => {
  return await db('users').where({ id }).first();
};

/**
 *
 * @param {string} username
 * @returns {Promise<ExistingUser>}
 */
const findByUsername = async (username) => {
  return await db('users').where({ username }).first();
};

/**
 *
 * @param {User} user
 * @returns {Promise<ExistingUser>}
 */
const add = async (user) => {
  return await db('users')
    .insert(user, 'id')
    .then(([id]) => findByID(id));
};

module.exports = { findByID, findByUsername, add };
