// @ts-check

const db = require('../data/db-config');

/**
 *
 * @param {string} id
 */
const findByID = async (id) => {
  return await db('users').where({ id }).first();
};

/**
 *
 * @param {string} username
 */
const findByUsername = async (username) => {
  return await db('users').where({ username }).first();
};

/**
 * @typedef User
 * @property {string} username
 * @property {string} password
 */

/**
 *
 * @param {User} user
 */
const add = async (user) => {
  return await db('users')
    .insert(user, 'id')
    .then(([id]) => findByID(id));
};

module.exports = { findByID, findByUsername, add };
