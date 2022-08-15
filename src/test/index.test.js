const ola = require("../index")

describe("teste", () => {
  it("teste", () => {
    expect(ola).to.be.deep.equal({status:200, json:"olá"});
  })
})
