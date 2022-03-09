import { Controller, Get, Param } from '@nestjs/common';
import { FreezeBalanceService } from '../services/freeze-balance.service';

@Controller('freeze-balance')
export class FreezeBalanceController {
  constructor(private readonly freezeBalanceService: FreezeBalanceService) {}

  @Get()
  findAll() {
    return this.freezeBalanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.freezeBalanceService.findOne(+id);
  }
}
