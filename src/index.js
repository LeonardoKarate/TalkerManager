const express = require('express');
const bodyParser = require('body-parser');
const Talker = require('./talker');
const { idValidate, talkerVerify } = require('./middleware/talker');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => res.status(200).json('ola'));

app.get('/talker', async (_req, res) => {
  const result = await Talker.getAllTalkers();
  return res.status(200).json(result);
});

app.get('/talker/:id', idValidate, async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Talker.getOneTalker(id);
    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
});

app.post('/talker', talkerVerify, async (req, res, next) => {
  try {
    const talker = req.body;
    const result = await Talker.createTalker(talker);
    return res.status(201).json(result);
  } catch (err) {
    return next(err);
  }
});

app.listen(3000, () => {
  console.log('aplicação rodando na porta 3000');
});

app.use((err, req, res, _next) => {
  if (err.status) {
    return res.status(err.status)
      .json({ message: err.message });
  }
  return res.status(500).json({ message: err.message });
});
