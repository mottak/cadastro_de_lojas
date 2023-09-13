import * as userService from '../../../src/services/userService';
import {  allUsers, createnewUser, loginBody, newUser, userSerachTerm, validLoginUser } from '../mocks/usersMocks';
import { assert, expect } from 'chai'
import sinon from 'sinon'
import crypto from '../../../src/helper/cryptoPrassword'

import { prisma } from '../../../src/services/userService'

describe('UserService', () => {

  describe('list users', () => {

    beforeEach(() => { sinon.restore(); });

    it('Successfully list all users', async() => {
    
      prisma.user.findMany = sinon.stub().resolves(allUsers)
     
      const result = await userService.list(1, 20, '')
      expect(result).to.deep.equal(allUsers)
    })

    it('Successfully list users filtered by searchTerm', async() => {
    
      prisma.user.findMany = sinon.stub().resolves(userSerachTerm)
     
      const result = await userService.list(1, 20, 'ria')
      expect(result).to.deep.equal(userSerachTerm)
    })

    it('Successfully list user by id', async() => {
    
      prisma.user.findUnique = sinon.stub().resolves(validLoginUser)
     
      const result = await userService.findOne(1)
      expect(result).to.deep.equal(validLoginUser)
    })
  
  })
  
  describe('Create user', () => {
    beforeEach(() => { sinon.restore(); });
  
    it('Successfully create new user', async() => {
      prisma.user.create = sinon.stub().resolves(newUser)

      sinon.stub(crypto, 'cryptoPassword').resolves(validLoginUser.password)

      const result = await userService.create(createnewUser)
      expect(result).to.deep.equal(newUser)
  
    })
  
  })

  describe('Edit user', () => {
    beforeEach(() => { sinon.restore(); });
  
    it('Successfully edit user', async() => {
      prisma.user.update = sinon.stub().resolves(newUser)

      const result = await userService.edit(1, newUser.name, newUser.email)
      expect(result).to.deep.equal(newUser)
  
    })

    it('Try to edit a diferent user', async() => {
      prisma.user.update = sinon.stub().throws()

      try {
        await userService.edit(5, newUser.name, newUser.email);
        assert.fail('Expected an error to be thrown');
      } catch (error) {
        expect((error as Error).message, 'Provid a valid id.');
      }
  
    })
  
  })

  describe('Remove user', () => {
    beforeEach(() => { sinon.restore(); });
  
    it('Successfully remove user', async() => {
      prisma.user.delete = sinon.stub().resolves()     
      expect(await userService.remove(1)).to.not.throw
  
    })
  
    it('Try to remove a invalid user', async() => {
      prisma.user.delete = sinon.stub().throws()
      
      try {
        await userService.remove(5);
        assert.fail('Expected an error to be thrown');
      } catch (error) {
        expect((error as Error).message, 'Provid a valid id.');
      }
  
    })

    it('Successfully remove all users', async() => {
      prisma.user.deleteMany = sinon.stub().resolves()
      
      expect(await userService.removeMany()).to.not.throw
  
    })
  
  })

  describe('Login', () => {
    beforeEach(() => { sinon.restore(); });
  
    it('Successfully Login', async() => {
      prisma.user.findUnique = sinon.stub().resolves(validLoginUser)

      const result = await userService.login(loginBody.email)
      expect(result).to.deep.equal(validLoginUser)
  
    })

    it('Try Login with invalid user', async() => {
      prisma.user.findUnique = sinon.stub().resolves(null)

      const result = await userService.login("emailinvalido@email.com")
      expect(result).to.throw()
  
    })

  
  })

  
})

