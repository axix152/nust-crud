import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';

@Controller('ninjas')
export class NinjasController {
  constructor(private readonly ninjaService: NinjasService){}
  // GET /ninjas --> []
  @Get()
  getNinjas(@Query('weapon') weapon:'stars' | 'nunchucks'){
    return this.ninjaService.getNinjas(weapon)
  }

  // Get /ninjas/:id ---> {}
  @Get(':id')
  getOneNinja(@Param('id',ParseIntPipe) id:number){
    try{
      return this.ninjaService.getNinja(id);
    }catch(err){
      throw new NotFoundException();
    }
  }

  // Post /ninjas
  @Post()
  createNinja(@Body(new ValidationPipe()) createninjaDto:CreateNinjaDto){
    return this.ninjaService.createNinja(createninjaDto);
  }
  // Put /ninjas/:id
  @Put(':id')
  updateNinja(@Param('id',ParseIntPipe) id:number,@Body() updateNinjaDto:UpdateNinjaDto){
    return this.ninjaService.updateNinja(id,updateNinjaDto);
  }

  // Delete /ninjas/:id
  @Delete(':id')
  removeNinja(@Param('id',ParseIntPipe) id:number){
    return this.ninjaService.removeNinja(id);
  }
}  
