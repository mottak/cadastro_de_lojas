import * as storeService from '../../src/services/storesService';
import { assert, expect } from 'chai'
import sinon from 'sinon'
import crypto from '../../src/helper/cryptoPrassword'

import { prisma } from '../../src/services/storesService'
import { allStores, createNewStore, newStore } from '../mocks/storesMocks';

describe('storeService', () => {

  let stubInstance: sinon.SinonStub
  describe('list stores', () => {

    beforeEach(() => { sinon.restore(); });

    it('Successfully list all stores', async() => {
    
      stubInstance = prisma.store.findMany = sinon.stub().resolves(allStores)
     
      const result = await storeService.list()
      expect(result).to.deep.equal(allStores)
    })

    it('Successfully list store by id', async() => {
    
      stubInstance = prisma.store.findUnique = sinon.stub().resolves(allStores[0])
     
      const result = await storeService.findOne(1)
      expect(result).to.deep.equal(allStores[0])
    })
  
  })
  
  describe('Create store', () => {
    beforeEach(() => { sinon.restore(); });
  
    it('Successfully create new store', async() => {
      stubInstance = prisma.store.create = sinon.stub().resolves(newStore)

      const result = await storeService.create(createNewStore)
      expect(result).to.deep.equal(newStore)
  
    })
  
  })

  // describe('Edit user', () => {
  //   beforeEach(() => { sinon.restore(); });
  
  //   it('Successfully edit user name', async() => {
  //     stubInstance = prisma.user.update = sinon.stub().resolves(newUser)

  //     const result = await storeService.editName(1, createnewUser.name)
  //     expect(result).to.deep.equal(newUser)
  
  //   })

  //   })
  
 

  describe('Remove store', () => {
    beforeEach(() => { sinon.restore(); });
  
    it('Successfully remove store', async() => {
      stubInstance = prisma.store.delete = sinon.stub().resolves()
      expect(await storeService.remove(1)).to.not.throw
  
    })
  
  })

  

  
})

