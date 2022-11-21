import { Injectable } from '@nestjs/common';

import { Post, Prisma, Comment } from '@prisma/client';

import { CommentMongoService } from '../../providers/mongo/comment.service'

@Injectable()
export class CommentsService {

  constructor(
    private commentMongoService: CommentMongoService,
  ){}

  async createComment(params: {postId: string, userId: string, comment : string}) : Promise<{error: boolean, comment?: Comment}>{

    let userWhereUniqueInput : Prisma.UserWhereUniqueInput = {
      id : params.userId
    };
    let userCreateNestedOneWithoutCommentsInput : Prisma.UserCreateNestedOneWithoutCommentsInput = {
      connect : userWhereUniqueInput
    }

    let postWhereUniqueInput : Prisma.PostWhereUniqueInput = {
      id : params.postId
    };
    let postCreateNestedOneWithoutCommentsInput : Prisma.PostCreateNestedOneWithoutCommentsInput = {
      connect : postWhereUniqueInput
    }

    let newCommentInput : Prisma.CommentCreateInput = {
      comment : params.comment,
      post: postCreateNestedOneWithoutCommentsInput,
      commenter: userCreateNestedOneWithoutCommentsInput
    }

    let newComment : Comment = await this.commentMongoService.createComment(newCommentInput)

    return {error: false, comment: newComment}
  }

}