import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

import { MongodbModule } from '../../providers/mongo/mongo.module';

import { AppModules } from '../../appModules/index'

@Module({
  imports: [
    MongodbModule,
    AppModules
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService]
})
export class PostsModule {}
