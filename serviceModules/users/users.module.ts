import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { MongodbModule } from '../../providers/mongo/mongo.module';
import { CryptoModule } from '../../appModules/crypto/crypto.module'

@Module({
  imports: [
    CryptoModule, 
    MongodbModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
