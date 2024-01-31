import { Injectable } from '@nestjs/common';
import { Item, ItemStatus } from './item.model';

@Injectable()
export class ItemService {
  private items: Item[] = []


  findAll(): Item[] {
    return this.items
  }

  findById(id: string): Item | null {
    return this.items.find(item => item.id === id) ?? null
  }

  create(item: Item): Item {
    this.items.push(item)
    return item;
  }

  updateStatus(id: string): Item | null {
    const item = this.findById(id)
    if (!!item) {
      item.status = ItemStatus.SOLD_OUT
      return item
    } else {
      return null
    }
  }

  delete(id: string): void {
    this.items = this.items.filter(item => item.id != id)
  }
}