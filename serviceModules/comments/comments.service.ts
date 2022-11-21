import { Injectable } from '@nestjs/common';

import { Post, Prisma, Comment } from '@prisma/client';
import { retry } from 'rxjs';

import { CommentMongoService } from '../../providers/mongo/comment.service'

@Injectable()
export class CommentsService {

  constructor(
    private commentMongoService: CommentMongoService,
  ){}


  async getWholeComment(postId: string) : Promise<{error: boolean, comments?: Comment[]}>{
    
    let WholePostId : Comment[]
    
    try{
      WholePostId = await this.commentMongoService.getWholeComments(postId);
    } catch(e){
      return {error: true}
    }
    
    return {error: false, comments: WholePostId}
  }


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

  
  async patchComment(params : {userId : string, commentId: string, comment: string}) : Promise<{error: boolean, comment?: Comment}> {
    
    let getCommentUniqueInput : Prisma.CommentWhereUniqueInput = {
      id: params.commentId,
    }

    let selectedComment : Comment;
    try{
      selectedComment = await this.commentMongoService.getComment(getCommentUniqueInput);
    } catch(e){
      return {error: true}
    }

    if(selectedComment.commenterId !== params.userId) return {error: true}
    
    let CommentUpdateInput : Prisma.CommentUpdateInput = {
      comment : params.comment
    }
    try{
      selectedComment = await this.commentMongoService.updateComment({
        where: getCommentUniqueInput,
        data: CommentUpdateInput
      });
    } catch(e){
      return {error: true}
    }
    
    return {error: false, comment: selectedComment}
  }













}