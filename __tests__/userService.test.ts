import * as userService from '../src/services/userService';
import {  allUsers, createnewUser, loginBody, newUser, validLoginUser } from './mocks/usersMocks';
import { assert, expect } from 'chai'
import sinon from 'sinon'
import crypto from '../src/helper/cryptoPrassword'

import { prisma } from '../src/services/userService'
import { CustomError } from '../src/Error/CustomError';

describe('UserService', () => {

  let stubInstance: sinon.SinonStub
  describe('list users', () => {

    beforeEach(() => { sinon.restore(); });

    it('Successfully list all users', async() => {
    
      stubInstance = prisma.user.findMany = sinon.stub().resolves(allUsers)
     
      const result = await userService.list()
      expect(result).to.deep.equal(allUsers)
    })

    it('Successfully list user by id', async() => {
    
      stubInstance = prisma.user.findUnique = sinon.stub().resolves(validLoginUser)
     
      const result = await userService.findOne(1)
      expect(result).to.deep.equal(validLoginUser)
    })
  
  })
  
  describe('Create user', () => {
    beforeEach(() => { sinon.restore(); });
  
    it('Successfully create new user', async() => {
      stubInstance = prisma.user.create = sinon.stub().resolves(newUser)

      sinon.stub(crypto, 'cryptoPassword').resolves(validLoginUser.password)

      const result = await userService.create(createnewUser)
      expect(result).to.deep.equal(newUser)
  
    })
  
  })

  describe('Edit user', () => {
    beforeEach(() => { sinon.restore(); });
  
    it('Successfully edit user name', async() => {
      stubInstance = prisma.user.update = sinon.stub().resolves(newUser)

      const result = await userService.editName(1, createnewUser.name)
      expect(result).to.deep.equal(newUser)
  
    })

    it('Successfully edit user email', async() => {
      stubInstance = prisma.user.update = sinon.stub().resolves(newUser)

      const result = await userService.editEmail(1, createnewUser.email)
      expect(result).to.deep.equal(newUser)
  
    })

    it('Successfully edit user password', async() => {
      stubInstance = prisma.user.update = sinon.stub().resolves()
      sinon.stub(crypto, 'cryptoPassword').resolves(validLoginUser.password)

      expect(await userService.editPassword(1, createnewUser.password)).to.not.throw
  
    })
  
  })

  describe('Remove user', () => {
    beforeEach(() => { sinon.restore(); });
  
    it('Successfully remove user', async() => {
      stubInstance = prisma.user.delete = sinon.stub().resolves()


      
      expect(await userService.remove(1)).to.not.throw
  
    })
  
  })

  describe('Login', () => {
    beforeEach(() => { sinon.restore(); });
  
    it('Successfully Login', async() => {
      stubInstance = prisma.user.findUnique = sinon.stub().resolves(validLoginUser)

      const result = await userService.login(loginBody.email)
      expect(result).to.deep.equal(validLoginUser)
  
    })
    // it('Try to Login with a invalid email', async() => {
    //   stubInstance = prisma.user.findUnique = sinon.stub().resolves(null)

    //   const result = await userService.login('emailnaocadastrado@email.com')
    //   expect(result).to.thrown('Email')
    // })
  
  })

  
})

