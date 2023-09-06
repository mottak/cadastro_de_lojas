import { Request, Response } from 'express';
import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai' 
import * as userService from '../src/services/userService';
import userController from '../src/controllers/usersController'
import { allUsers, newUser } from './mocks/usersMocks';

chai.use(sinonChai)

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



    // it('The users` list is empty', async() => {
    //   sinon.stub(userService, 'list').resolves([])
  
    //   const req = {} as Request
    //   const res = {} as Response
    
    //   res.status = sinon.stub().returns(res)
    //   res.json = sinon.stub().returns(res)
  
    //   await userController.list(req, res)
    //   expect(res.status).to.have.been.calledWith(200)
    //   expect(res.json).to.have.been.calledWith()
    // })
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

  it('Successfully edit user name', async() => {
    sinon.stub(userService, 'editName').resolves(newUser)
  
    const req = {} as Request
    const res = {} as Response

    req.params = { 
      id: "1"
    }
  
    req.body = {
      "name": "Maria das Graças",
    }
    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns(res)

      
    await userController.editName(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(newUser)
    
  })

  it('Successfully edit user email', async() => {
    sinon.stub(userService, 'editEmail').resolves(newUser)
  
    const req = {} as Request
    const res = {} as Response

    req.params = { 
      id: "1"
    }
  
    req.body = {
      email: "maria@email.com"
    }
    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns(res)

      
    await userController.editEmail(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(newUser)
  })

  it('Successfully edit user password', async() => {
    sinon.stub(userService, 'editPassword').resolves()
  
    const req = {} as Request
    const res = {} as Response

    req.params = { 
      id: "1"
    }
  
    req.body = {
      password: "123456"
    }
    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns(res)

      
    await userController.editEmail(req, res);

    expect(res.status).to.have.been.calledWith(200);
    // expect(res.json).to.have.been.calledWith({ message: 'Password successfully changed.'})
  })

})

describe('Remove user', () => {
  afterEach(() => {
    sinon.reset()
  })
  it('Successfully create new user', async() => {
    sinon.stub(userService, 'remove').resolves()
  
    const req = {} as Request
    const res = {} as Response

    req.params = { 
      id: "1"
    }
  
    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns(res)

      
    await userController.remove(req, res);

    expect(res.status).to.have.been.calledWith(204);
  })

})

