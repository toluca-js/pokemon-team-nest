import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { PokemonTeamController } from './pokemon-team/pokemon-team.controller';
import { AppService } from './app.service';
import { PokemonTeamService } from './pokemon-team/pokemon-team.service';
import { RequestIdMiddleware } from './middlewares/request-id.middleware';

@Module({
  imports: [],
  controllers: [
    AppController,
    PokemonTeamController
  ],
  providers: [
    AppService,
    PokemonTeamService
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestIdMiddleware)
      .forRoutes(PokemonTeamController);
  }
}
