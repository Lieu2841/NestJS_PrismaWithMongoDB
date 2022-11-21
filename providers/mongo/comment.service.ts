import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User, Post, Comment, Counter, Prisma } from '@prisma/client';

@Injectable()
export class CommentMongoService {
  constructor(private prisma: PrismaService) {}

  async createComment(data: Prisma.CommentCreateInput): Promise<Comment> {
    return this.prisma.comment.create({
      data,
    });
  }

}