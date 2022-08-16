const fs = require('fs').promises;

const getAllTalkers = async () => {
  try {
    const result = await fs.readFile("src/talkers.json", "utf8");
    return JSON.parse(result);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  getAllTalkers,
};
