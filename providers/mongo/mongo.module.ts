/* 
  MongoDB using with Prisma
  https://docs.nestjs.com/recipes/prisma
*/

import { Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';

import { UserMongoService } from './user.service';

@Module({
  imports: [],
  providers: [PrismaService, UserMongoService],
  exports: [UserMongoService],
})
export class MongodbModule {}