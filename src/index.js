const express = require('express');
const talker = require('./talker');
const { idValidate } = require('./middleware/talker');

const app = express();

app.get('/', (req, res) => {
  return res.status(200).json("ola");
});

app.get('/talker', async (_req, res) => {
  const result = await talker.getAllTalkers();
  return res.status(200).json(result);
});

app.get('/talker/:id', idValidate, async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await talker.getOneTalker(id);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
})

app.listen(3000, () => {
  console.log("aplicação rodando na porta 3000");
});

app.use((err, _req, res, _next) => {
  if (err.status) return res.status(err.status)
    .json({message: err.message});
  return res.status(500).json({message: err.message});
})
