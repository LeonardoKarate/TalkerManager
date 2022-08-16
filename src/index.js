const express = require('express');
const talker = require('./talker')

const app = express();

app.get('/', (req, res) => {
  return res.status(200).json("ola");
});

app.get('/talker', async (_req, res) => {
  const result = await talker.getAllTalkers();
  return res.status(200).json(result);
});

app.listen(3000, () => {
  console.log("aplicação rodando na porta 3000");
});

app.use((err, _req, res, _next) => {
  return res.status(500).json(err.message);
})

module.exports = ola;
