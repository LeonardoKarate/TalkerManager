const { expect } = require('chai');
const fs = require('fs');
const sinon = require('sinon');
const { getAllTalkers } = require("../talker");
const allTalkersMock = require('./mock/talkesMock');

sinon.stub(fs,"readFileSync").returns(allTalkersMock)
describe("teste o endPoint getAllTalkers", () => {
  it("em caso de suscesso", async () => {
    const atual = await getAllTalkers()
    expect(atual).to.be.deep.equals(allTalkersMock);
  })
})
