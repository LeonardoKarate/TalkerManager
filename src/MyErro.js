class MyErro extends Error {
  status = "";
  constructor(status, message) {
    super();
    this.status = status;
  }
};

module.exports = MyErro;
