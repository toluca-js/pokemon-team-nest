import { Controller, Delete, Get, Param, Post, Put, Req, UseInterceptors } from '@nestjs/common';
import { LoggerInterceptor } from 'src/interceptors/logger.interceptor';
import { PokemonTeamService } from './pokemon-team.service';

@UseInterceptors(LoggerInterceptor)
@Controller('pokemon-team')
export class PokemonTeamController {
  constructor(
    private readonly teamService: PokemonTeamService
    ) {}

  @Get()
  getTeam(): any {
    return this.teamService.getTeam();
  }

  @Post()
  addMember(@Req() request: Request): any {
    return this.teamService.addMember(request.body);
  }

  @Put()
  updateMember(@Req() request: Request): any {
    return this.teamService.updateMember(request.body);
  }

  @Delete(':id')
  deleteMember(@Param() params): any {
    return this.teamService.deleteMember(params.id);
  }
}