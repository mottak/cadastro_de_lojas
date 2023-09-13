import { Request, Response } from 'express';
import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai' 
import * as storeService from '../../../src/services/storesService';
import storeController from '../../../src/controllers/storeController'
import { allStores, newStore } from '../mocks/storesMocks';
import { newUser } from '../mocks/usersMocks';

chai.use(sinonChai)

describe('Stores Controller', () => {
  beforeEach(() => { sinon.restore(); });
describe('list stores', () => {
  beforeEach(() => { sinon.restore(); });

  it('List all stores', async() => {

    sinon.stub(storeService, 'list').resolves(allStores)
  
    const req = {} as Request
    const res = {} as Response
  
    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns(res)

    await storeController.list(req, res)
    expect(res.status).to.have.been.calledWith(200)
    expect(res.json).to.have.been.calledWith(allStores)
  })

  })


describe('Create store', () => {
  beforeEach(() => { sinon.restore(); });

  it('Successfully create new store', async() => {
    sinon.stub(storeService, 'create').resolves(newStore)
  
    const req = {} as Request
    const res = {} as Response
    res.locals = { user: newUser }
    
    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns(res)

    res.locals = { user: newUser }

    req.body = {
      "name": "Nova loja do bairro",
      "urlLogo": "https://www.prisma.io/nextjs",
      "address": "Rua das Araras, 450 Bairro Planices",

    }
      
    await storeController.create(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newStore)
  })

})

describe('Edit store', () => {
  beforeEach(() => { sinon.restore(); });

  it('Successfully edit store', async() => {
    sinon.stub(storeService, 'edit').resolves(newStore)
  
    const req = {} as Request
    const res = {} as Response

    req.params = { 
      id: "1"
    }
    
    req.body = {
      "name": "Nova loja do bairro",
      "urlLogo": "https://www.prisma.io/nextjs",
      "address": "Rua das Araras, 450 Bairro Planices",
    }

    res.locals = { user: newUser }

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns(res)

      
    await storeController.edit(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(newStore)
    
  })

})

describe('Remove store', () => {
  beforeEach(() => { sinon.restore(); });
  it('Successfully remove a store by id', async() => {
    sinon.stub(storeService, 'remove').resolves()
  
    const req = {} as Request
    const res = {} as Response


    req.params = { 
      id: "1"
    }

    res.locals = { user: newUser }
  
    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns(res)

      
    await storeController.remove(req, res);

    expect(res.status).to.have.been.calledWith(204);
  })
  
  it('Successfully remove all stores', async() => {
    sinon.stub(storeService, 'removeMany').resolves()
  
    const req = {} as Request
    const res = {} as Response
  
    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns(res)

      
    await storeController.removeMany(req, res);

    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).to.have.been.calledWith({message: 'All stores have been removed.'});
  })

})
})
