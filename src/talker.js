const fs = require('fs').promises;
const MyErro = require('./MyErro');

const getAllTalkers = async () => {
  try {
    const result = await fs.readFile('src/talkers.json', 'utf8');
    return JSON.parse(result);
  } catch (err) {
    throw new MyErro(401, 'talker not found');
  }
};

const getOneTalker = async (id) => {
  const retorno = await fs.readFile('src/talkers.json', 'utf8');
  const talkerList = JSON.parse(retorno);
  const [result] = talkerList.filter((t) => String(t.id) === id);
  if (!result) throw new MyErro(401, 'talker not found');
  return result;
};

const createTalker = async (talker) => {
  const talkers = await getAllTalkers();
  const result = { ...talker };
  result.id = talkers.length + 1;
  await fs.writeFile('src/talkers.json', JSON.stringify([...talkers, result]));
  return result;
};

const atualizaTalker = async (id, talker) => {
  const talkerList = await getAllTalkers();
  const result = talkerList.filter((t) => t.id !== parseInt(id, 10));
  await fs.writeFile('src/talkers.json', JSON.stringify([...result, { ...talker, id }]));
  return { ...talker, id };
};

module.exports = {
  getAllTalkers,
  getOneTalker,
  createTalker,
  atualizaTalker,
};
