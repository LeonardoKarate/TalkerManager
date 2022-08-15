const express = require('express');

const app = express();

const ola = (req, res) => {
  return res.status(200).json("olá");
};

app.get('/', ola);

app.listen(3000, () => {
  console.log("aplicação rodando na porta 3000");
});

export default ola;
