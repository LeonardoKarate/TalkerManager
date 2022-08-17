const fs = require('fs').promises;
const MyErro = require('./MyErro');

const getAllTalkers = async () => {
  try {
    const result = await fs.readFile("src/talkers.json", "utf8");
    return JSON.parse(result);
  } catch (err) {
    throw new MyErro(401, "talker not found");
  }
};
const getOneTalker = async (id) => {
  const retorno = await fs.readFile("src/talkers.json", "utf8");
  const talkerList = JSON.parse(retorno);
  const [result] = talkerList.filter((t) => String(t.id) === id);
  if (!result) throw new MyErro(401, "talker not found");
  return result;
};

module.exports = {
  getAllTalkers,
  getOneTalker,
};
