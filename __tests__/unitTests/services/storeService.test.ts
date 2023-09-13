import * as storeService from '../../../src/services/storesService';
import chai, { assert, expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'
import { prisma } from '../../../src/services/storesService'
import { allStores, createNewStore, newStore, storeSearchTerm } from '../mocks/storesMocks';

chai.use(chaiAsPromised);

describe('storeService', () => {

  describe('list stores', () => {

    beforeEach(() => { sinon.restore(); });

    it('Successfully list all stores', async() => {
    
      prisma.store.findMany = sinon.stub().resolves(allStores)
     
      const result = await storeService.list(1, 20, '')
      expect(result).to.deep.equal(allStores)
    })

    it('Successfully list users filtered by searchTerm', async() => {
    
      prisma.store.findMany = sinon.stub().resolves(storeSearchTerm)
     
      const result = await storeService.list(1, 20, 'ria')
      expect(result).to.deep.equal(storeSearchTerm)
    })


    

    it('Successfully list store by id', async() => {
    
      prisma.store.findUnique = sinon.stub().resolves(allStores[0])
     
      const result = await storeService.findOne(1)
      expect(result).to.deep.equal(allStores[0])
    })
  
  })
  
  describe('Create store', () => {
    beforeEach(() => { sinon.restore(); });
  
    it('Successfully create new store', async() => {
      prisma.store.create = sinon.stub().resolves(newStore)

      const result = await storeService.create(createNewStore)
      expect(result).to.deep.equal(newStore)
  
    })
  
  })

  describe('Edit store', () => {
    beforeEach(() => { sinon.restore(); });
  
    it('Successfully edit store', async() => {
      prisma.store.update = sinon.stub().resolves(newStore)

      const result = await storeService.edit(1, newStore.name, newStore.urlLogo, newStore.address, 2)
      expect(result).to.deep.equal(newStore)
  
    })

    it('Try to edit a store by diferent owner', async() => {
      prisma.store.update = sinon.stub().throws()
      try {
        await storeService.edit(1, newStore.name, newStore.urlLogo, newStore.address, 5);
        assert.fail('Expected an error to be thrown');
      } catch (error) {
        expect((error as Error).message, 'You must be the owner to edit a store.');
      }
    
    })

    })
  
 

  describe('Remove store', () => {
    beforeEach(() => { sinon.restore(); });
  
    it('Successfully remove store', async() => {
      prisma.store.delete = sinon.stub().resolves()
      expect(await storeService.remove(1, 1)).to.not.throw
  
    })

    it('Try to remove a store by diferent owner', async() => {
      prisma.store.delete = sinon.stub().throws()
      try {
        await storeService.remove(1, 5)
        assert.fail('Expected an error to be thrown');
      } catch (error) {
        expect((error as Error).message, 'You must be the owner to delete a store.');
      }
  
    })

    it('Successfully remove all stores', async() => {
      prisma.store.deleteMany = sinon.stub().resolves()
      expect(await storeService.removeMany()).to.not.throw
  
    })
  
  })

  

  
})

