import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

import { MongodbModule } from '../../providers/mongo/mongo.module';

import { AppModules } from '../../appModules/index'

@Module({
  imports: [
    MongodbModule,
    AppModules
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService]
})
export class CommentsModule {}
