// @ts-check

const JWT = require('jsonwebtoken');
const userDB = require('../models/user.model');

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const id = JWT.verify(token, process.env.SECRET);
    if (typeof id === 'string') {
      const { password, ...user } = await userDB.findByID(id);
      if (user) {
        // @ts-ignore
        req.user = user;
        next();
      } else {
        throw new Error();
      }
    }
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Could not verify the token' });
  }
};
