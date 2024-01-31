import { Test, TestingModule } from '@nestjs/testing';
import { ItemService } from './item.service';
import { Item, ItemStatus } from './item.model';

describe('ItemService', () => {
  let service: ItemService;

  const dummyCreate = (id?: string) => {
    const fixture: Item = {
      id: id ?? "999",
      name: "test",
      price: 100,
      description: "test description",
      status: ItemStatus.ON_SALE
    }

    service.create(fixture)
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemService],
    }).compile();

    service = module.get<ItemService>(ItemService);

    Array(3).fill(0).forEach((_: number, index: number) => dummyCreate(`${index}`))
  });

  it('create', () => {
    const fixture: Item = {
      id: "1",
      name: "test",
      price: 100,
      description: "test description",
      status: ItemStatus.ON_SALE
    }

    const actual = service.create(fixture)
    expect(actual).toStrictEqual({
      id: "1",
      name: "test",
      price: 100,
      description: "test description",
      status: ItemStatus.ON_SALE
    })
  });

  describe('findAll()', () => {
    it('default', () => {
      expect(service.findAll().length).toBe(3)
    });

    it('after create', () => {
      dummyCreate('4')
      expect(service.findAll().length).toBe(4)
    });
  })

  describe('findById()', () => {
    it('findById', () => {
      const actual = service.findById('1');
      expect(actual).toStrictEqual({
        id: "1",
        name: "test",
        price: 100,
        description: "test description",
        status: ItemStatus.ON_SALE
      })
    });

    it('not find', () => {
      const actual = service.findById('a');
      expect(actual).toBeNull()
    });
  })

  describe('updateStatus()', () => {
    it('update_success', () => {
      const actual = service.updateStatus('1')
      expect(actual).toStrictEqual({
        id: "1",
        name: "test",
        price: 100,
        description: "test description",
        status: ItemStatus.SOLD_OUT
      })
    });

    it('update_failed', () => {
      const actual = service.updateStatus('a')
      expect(actual).toBeNull()
    });
  })

  describe('delete()', () => {
    it('delete_success', () => {
      expect(service.findAll().length).toBe(3)
      const actual = service.delete('1')
      expect(service.findAll().length).toBe(2)
    })

    it('delete_failed', () => {
      expect(service.findAll().length).toBe(3)
      const actual = service.delete('aaa')
      expect(service.findAll().length).toBe(3)
    })
  })
});
