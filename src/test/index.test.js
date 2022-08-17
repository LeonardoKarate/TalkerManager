const chai = require('chai');
const { expect } = chai
const fs = require('fs');
const sinon = require('sinon');
const { getAllTalkers, getOneTalker } = require("../talker");
const allTalkersMock = require('./mock/talkesMock');

chai.use(require('chai-as-promised'))
describe("teste o endPoint getAllTalkers", () => {
  it("em caso de suscesso", async () => {
    sinon.stub(fs,"readFileSync").returns(allTalkersMock)
    const atual = await getAllTalkers()
    expect(atual).to.be.deep.equals(allTalkersMock);
  })
})

describe("teste o endPoint getOneTalker", () => {
  it("em caso de suscesso", async () => {
    const atual = await getOneTalker("1")
    expect(atual).to.be.deep.equals(allTalkersMock[0]);
  });
  it("em caso de falha", async () => {
    await expect(getOneTalker("a")).to.be.rejectedWith(Error)
  })
})
