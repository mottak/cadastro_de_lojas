import { Request, Response } from 'express';
import { createMocks } from 'node-mocks-http'
import usersController from '../src/controllers/usersController'
import * as userService from '../src/services/userService';

import { allUsers, editUser, newUser, validToken } from './mocks/usersMocks';

jest.mock('../src/services/userService');

describe('list users', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('List all users', async() => {
    const mockList = jest.spyOn(userService, 'list');
    mockList.mockResolvedValue(allUsers);

    const { req, res } = createMocks<Request, Response>();
      
    await usersController.list(req, res);

    expect(mockList).toHaveBeenCalled();
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual(allUsers);
  })

  describe('list users', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })
  
    afterAll(() => {
      jest.clearAllMocks()
    })

    it('The users` list is empty', async() => {
      const mockList = jest.spyOn(userService, 'list');
      mockList.mockResolvedValue([]);

      const { req, res } = createMocks<Request, Response>();
        
      await usersController.list(req, res);

      expect(mockList).toHaveBeenCalled();
      expect(res._getStatusCode()).toBe(200);
      expect(res._getJSONData()).toEqual([]);
    })
  })

})

describe('Create user', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('Successfully create new user', async() => {
    const mockList = jest.spyOn(userService, 'create');
    mockList.mockResolvedValue(newUser);

    const { req, res } = createMocks<Request, Response>();
    req.body = {
      "name": "Maria das Graças",
      "email": "maria@email.com"
    }
      
    await usersController.create(req, res);

    expect(mockList).toHaveBeenCalled();
    expect(res._getStatusCode()).toBe(201);
    expect(res._getJSONData()).toHaveProperty('id')
  })

})

describe('Edit user', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('Successfully edit user name', async() => {
    const mockList = jest.spyOn(userService, 'editName');
    mockList.mockResolvedValue(editUser);

    const { req, res } = createMocks<Request, Response>();
    req.headers.authorization = validToken
    req.params = { id: '1'}
    req.body = {
      "name": "Maria de Lourdes",
    }
      
    await usersController.editName(req, res);

    expect(mockList).toHaveBeenCalled();
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toHaveProperty('id')
    expect(res._getJSONData()).toHaveProperty('name')
    expect(res._getJSONData()).toHaveProperty('email')
    expect(res._getJSONData()).not.toHaveProperty('password')
    
  })

  it('Successfully edit user email', async() => {
    const mockList = jest.spyOn(userService, 'editEmail');
    mockList.mockResolvedValue(editUser);

    const { req, res } = createMocks<Request, Response>();
    req.headers.authorization = validToken
    req.params = { id: '1'}
    req.body = {
      "email": "maria@email.com",
    }
      
    await usersController.editEmail(req, res);

    expect(mockList).toHaveBeenCalled();
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toHaveProperty('id')
    expect(res._getJSONData()).toHaveProperty('name')
    expect(res._getJSONData()).toHaveProperty('email')
    expect(res._getJSONData()).not.toHaveProperty('password')
    
  })

  it('Successfully edit user password', async() => {
    const mockList = jest.spyOn(userService, 'editPassword');
  
    const { req, res } = createMocks<Request, Response>();
    req.headers.authorization = validToken
    req.params = { id: '1'}
    req.body = {
      "password": "senhasecreta",
    }
      
    await usersController.editPassword(req, res);

    expect(mockList).toHaveBeenCalled();
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toHaveProperty('message')
    expect(res._getJSONData()).not.toHaveProperty('password')
    
  })

})

describe('Remove user', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('Successfully create new user', async() => {
    const mockList = jest.spyOn(userService, 'remove');
  
    const { req, res } = createMocks<Request, Response>();
    req.params = {
      id: "1"
    }
      
    await usersController.remove(req, res);

    expect(mockList).toHaveBeenCalled();
    expect(res._getStatusCode()).toBe(204);
  })

})

