/* 
  MongoDB using with Prisma
  https://docs.nestjs.com/recipes/prisma
*/

import { Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  providers: [PrismaService],
  exports: [],
})
export class MongodbModule {}