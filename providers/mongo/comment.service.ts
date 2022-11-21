import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User, Post, Comment, Counter, Prisma } from '@prisma/client';

@Injectable()
export class CommentMongoService {
  constructor(private prisma: PrismaService) {}

  async getComment(
    commentWhereUniqueInput: Prisma.CommentWhereUniqueInput,
  ): Promise<Comment | null> {
    return this.prisma.comment.findUnique({
      where: commentWhereUniqueInput,
    });
  }

  async getWholeComments(postId : string): Promise<Comment[]> {

    let postWhereInput : Prisma.PostWhereInput = {
      id: postId
    }
    let postRelationFilter : Prisma.PostRelationFilter = {
      is: postWhereInput
    }

    let whereParams : Prisma.CommentWhereInput = {
      post : postRelationFilter,
      isDeleted: false
    }

    return this.prisma.comment.findMany({
      where : whereParams,
    });
  }

  async createComment(data: Prisma.CommentCreateInput): Promise<Comment> {
    return this.prisma.comment.create({
      data,
    });
  }

  async updateComment(params: {
    where: Prisma.CommentWhereUniqueInput;
    data: Prisma.CommentUpdateInput;
  }): Promise<Comment> {
    const { where, data } = params;
    return this.prisma.comment.update({
      data,
      where,
    });
  }

}