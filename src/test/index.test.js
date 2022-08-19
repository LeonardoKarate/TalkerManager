const chai = require('chai');

const { expect } = chai;
const fs = require('fs');
const sinon = require('sinon');
const { getAllTalkers, getOneTalker, createTalker } = require('../talker');
const { talkerVerify, nomeObrigatorio } = require('../middleware/talker');
const allTalkersMock = require('./mock/talkesMock');

chai.use(require('chai-as-promised'));

describe('teste o endPoint getAllTalkers', () => {
  it('em caso de suscesso', async () => {
    sinon.stub(fs.promises, 'readFile').returns(JSON.stringify(allTalkersMock));
    const atual = await getAllTalkers();
    expect(atual).to.be.deep.equals(allTalkersMock);
  });
});

describe('teste o endPoint getOneTalker', () => {
  it('em caso de suscesso', async () => {
    const atual = await getOneTalker('1');
    expect(atual).to.be.deep.equals(allTalkersMock[0]);
  });
  it('em caso de falha', async () => {
    await expect(getOneTalker('a')).to.be.rejectedWith(Error);
  });
});

describe('teste o endPoint postTalker', () => {
  it('em caso de suscesso', async () => {
    sinon.stub(fs.promises, 'writeFile').resolves();
    const { id, ...objetoTalker } = allTalkersMock[0];
    const atual = await createTalker(objetoTalker);
    objetoTalker.id = 5;
    expect(atual).to.be.deep.equals(objetoTalker);
  });
  it('caso sem nome', async () => {
    const request = {};
    const response = {};
    const next = {};

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    const { id, nome, ...objetoTalker } = allTalkersMock[0];
    request.body = { objetoTalker };
    await talkerVerify(request, response, next);
    expect(response.status.calledWith(400)).to.be.equal(true);
    expect(response.json.calledWith(nomeObrigatorio)).to.be.equal(true);
  });
});
