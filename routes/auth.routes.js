// @ts-check

const express = require('express');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const userDB = require('../models/user.model');

const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    const existingUser = await userDB.findByUsername(req.body.username);
    console.log(existingUser);

    if (existingUser) {
      return res.status(409).json({ message: 'A user with that username already exist' });
    } else {
      const password = bcrypt.hashSync(req.body.password, parseInt(process.env.SALT_ROUNDS, 10));
      const newUser = {
        username: req.body.username,
        password,
      };

      const { password: _discardPassword, ...user } = await userDB.add(newUser);
      res.status(201).json(user);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      errorMessage: 'Something went horribly horribly wrong. You should not do that again...',
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      //checking if username and password is valid
      return res.status(400).json({ message: 'We require username and password on the body' });
    }

    const user = await userDB.findByUsername(username);
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      //validating password
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = JWT.sign(user.id, process.env.SECRET);

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      errorMessage: 'Something went horribly horribly wrong. You should not do that again...',
    });
  }
});

module.exports = router;
