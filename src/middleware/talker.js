const nomeObrigatorio = { message: 'nome é obrigatório' };
const idadeObrigatorio = { message: 'idade é obrigatório' };
const idadeEInteger = { message: 'idade deve ser um numero inteiro' };
const maiorIdade = { message: 'palestrante deve ser de maior' };
const rateEInteger = { message: 'rate deve ser um numero inteiro de 1 a 5' };
const talkObrigatorio = {
  message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
};

const idValidate = (req, res, next) => {
  const { id } = req.params;
  if (Number.isNaN(id)) {
    return res.status(400)
      .json({ message: 'id inválido' });
  }
  return next();
};

const talkerVerify = (req, res, next) => {
  const talker = req.body;
  switch (true) {
    case !talker.name: return res.status(400).json(nomeObrigatorio);
    case !talker.age: return res.status(400).json(idadeObrigatorio);
    case !Number.isInteger(parseInt(talker.age, 10)): return res.status(400).json(idadeEInteger);
    case parseInt(talker.age, 10) < 18: return res.status(400).json(maiorIdade);
    case !talker.talk: return res.status(400).json(talkObrigatorio);
    case !talker.talk.rate: return res.status(400).json(talkObrigatorio);
    case !talker.talk.watchedAt: return res.status(400).json(talkObrigatorio);
    case !Number.isInteger(parseInt(talker.talk.rate, 10)):
      return res.status(400).json(rateEInteger);
    case parseInt(talker.talk.rate, 10) < 1 || parseInt(talker.talk.rate, 10) > 5:
      return res.status(400).json(rateEInteger);
    default: return next();
  }
};

module.exports = {
  idValidate,
  talkerVerify,
  nomeObrigatorio,
};
