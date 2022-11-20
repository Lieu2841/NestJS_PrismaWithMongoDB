import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { MongodbModule } from '../../providers/mongo/mongo.module';

import { AppModules } from '../../appModules/index'

@Module({
  imports: [
    MongodbModule,
    AppModules
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
