/* 
  MongoDB using with Prisma
  https://docs.nestjs.com/recipes/prisma
*/

import { Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';

import { UserMongoService } from './user.service';
import { PostMongoService } from './post.service';

@Module({
  imports: [],
  providers: [PrismaService, UserMongoService, PostMongoService],
  exports: [UserMongoService, PostMongoService],
})
export class MongodbModule {}