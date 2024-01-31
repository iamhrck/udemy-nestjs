import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ItemService } from './item.service';
import { Item, ItemStatus } from './item.model';
import { identity } from 'rxjs';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get('findAll')
  findAll(): Item[] {
    return this.itemService.findAll()
  }

  @Get('find/:id')
  findById(@Param('id')id: string): Item {
    return this.itemService.findById(id)
  }

  @Post('create')
  create(
    @Body('id') id: String,
    @Body('name') name: String,
    @Body('price') price: number,
    @Body('description') description: String,
  ): Item {
    const item: Item = {
      id,
      name,
      price,
      description,
      status: ItemStatus.ON_SALE
    }

    return this.itemService.create(item)
  }

  @Patch('update/:id')
  updateItem(@Param('id')id: string): Item | null {
    return this.itemService.updateStatus(id)
  }

  @Patch('delete/:id')
  deleteItem(@Param('id')id: string) {
    this.itemService.delete(id)
  }

}
