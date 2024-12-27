import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AddResourceDto, ResourceUpdateDto } from './dto/resource.dto';
import { ResourceService } from './resource.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Req_Int } from 'src/interface/common';

@Controller('resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}
  // to get resources
  @Get()
  @UseGuards(JwtAuthGuard)
  async getResources(@Request() req) {
    return this.resourceService.getResource(req);
  }

  // add resource
  @Post()
  @UseGuards(JwtAuthGuard)
  async addResource(@Body() addResourceDto: AddResourceDto, @Request() req) {
    return this.resourceService.addResource(addResourceDto, req);
  }

  // delete resource
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteResource(@Param('id') param: string, @Request() req: Req_Int) {
    return this.resourceService.deleteResource(param, req);
  }

  // update user important status
  @Put('/important/:id')
  @UseGuards(JwtAuthGuard)
  async updateImportant(
    @Param('id') param: string,
    @Body() resourceUpdateDto: ResourceUpdateDto,
    @Request() req: Req_Int,
  ) {
    return this.resourceService.updateImportant(param, resourceUpdateDto, req);
  }

  // update user fvrt
  @Put('/favourite/:id')
  @UseGuards(JwtAuthGuard)
  async updateFavourite(
    @Param('id') param: string,
    @Body() resourceUpdateDto: ResourceUpdateDto,
    @Request() req: Req_Int,
  ) {
    return this.resourceService.updateFavourite(param, resourceUpdateDto, req);
  }

  // update watch later
  @Put('/watchlater/:id')
  @UseGuards(JwtAuthGuard)
  async updateWatchLater(
    @Param('id') param: string,
    @Body() resourceUpdateDto: ResourceUpdateDto,
    @Request() req: Req_Int,
  ) {
    return this.resourceService.updateWatchLater(param, resourceUpdateDto, req);
  }
}
