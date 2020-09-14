// @ts-check

const express = require('express');

const helmet = require('helmet');
const cors = require('cors');

const app = express();

const authRouter = require('./routes/auth.routes');

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);

app.listen(3000, () => console.log('Listening on port http://localhost:3000...'));
