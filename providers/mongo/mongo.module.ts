/* 
  MongoDB using with Prisma
  https://docs.nestjs.com/recipes/prisma
*/

import { Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';

import { UserMongoService } from './user.service';
import { PostMongoService } from './post.service';
import { CommentMongoService } from './comment.service';

@Module({
  imports: [],
  providers: [PrismaService, UserMongoService, PostMongoService, CommentMongoService],
  exports: [UserMongoService, PostMongoService, CommentMongoService],
})
export class MongodbModule {}