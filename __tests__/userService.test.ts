import * as userService from '../src/services/userService';
import {  allUsers, createnewUser, newUser } from './mocks/usersMocks';
import { expect } from 'chai'
import sinon from 'sinon'

import { prisma } from '../src/services/userService'

describe('UserService', () => {
  let stubInstance: sinon.SinonStub
  afterEach(() => {
    stubInstance.reset()

  })
  describe('list users', () => {

    it('Successfully list all users', async() => {
    
      stubInstance = prisma.user.findMany = sinon.stub().resolves(allUsers)
     
      const result = await userService.list()
      expect(result).to.deep.equal(allUsers)
    })
  
  })
  
  describe('Create user', () => {
  
    it('Successfully create new user', async() => {
      stubInstance = prisma.user.create = sinon.stub().resolves(newUser)

      const result = await userService.create(createnewUser)
      expect(result).to.deep.equal(newUser)
  
    })
  
  })
})

