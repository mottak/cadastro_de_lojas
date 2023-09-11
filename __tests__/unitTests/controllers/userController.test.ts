import { Request, Response } from 'express';
import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai' 
import * as userService from '../../../src/services/userService';
import userController from '../../../src/controllers/usersController'
import { allUsers, newUser, userSerachTerm } from '../mocks/usersMocks';

chai.use(sinonChai)

describe('Users Controller', () => {

describe('list users', () => {
  afterEach(() => {
    sinon.reset()
  })

  it('List all users', async() => {

    sinon.stub(userService, 'list').resolves(allUsers)
  
    const req = {} as Request
    const res = {} as Response
  
    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns(res)

    await userController.list(req, res)
    expect(res.status).to.have.been.calledWith(200)
    expect(res.json).to.have.been.calledWith(allUsers)
  })

  })


describe('Create user', () => {
  afterEach(() => {
    sinon.reset()
  })

  it('Successfully create new user', async() => {
    sinon.stub(userService, 'create').resolves(newUser)
  
    const req = {} as Request
    const res = {} as Response
  
    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns(res)

    req.body = {
      "name": "Maria das Graças",
      "email": "maria@email.com"
    }
      
    await userController.create(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newUser)
  })

})

describe('Edit user', () => {
  afterEach(() => {
    sinon.reset()
  })

  it('Successfully edit user ', async() => {
    sinon.stub(userService, 'edit').resolves(newUser)
  
    const req = {} as Request
    const res = {} as Response

    req.params = { 
      id: "1"
    }
  
    req.body = {
      "name": "Maria das Graças",
      "email": "maria@email.com"
    }

    res.locals = { user: newUser }
    
    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns(res)

      
    await userController.edit(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(newUser)
    
  })


})

describe('Remove user', () => {
  afterEach(() => {
    sinon.reset()
  })
  it('Successfully remove user', async() => {
    sinon.stub(userService, 'removeMany').resolves()
  
    const req = {} as Request
    const res = {} as Response
    
    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns(res)
      
    await userController.removeMany(req, res);

    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).to.have.been.calledWith({ message: 'All users have been removed.' });
  })

})

})