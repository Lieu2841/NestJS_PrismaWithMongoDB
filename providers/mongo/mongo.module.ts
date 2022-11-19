/* 
  MongoDB using with Prisma
  https://docs.nestjs.com/recipes/prisma
*/

import { Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';

import { UserService } from './user.service';

@Module({
  imports: [],
  providers: [PrismaService, UserService],
  exports: [UserService],
})
export class MongodbModule {}