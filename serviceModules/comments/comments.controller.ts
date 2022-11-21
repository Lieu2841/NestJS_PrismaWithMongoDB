import { Controller, UseGuards, ValidationPipe, Param, Body, Req, Res, Get, Post, Patch, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';

import { CreateCommentDTO, UpdateCommentDTO, DeleteCommentDTO } from './comments.dto';

import { LoginGuard } from '../../appModules/auth/auth.guard';

@Controller('/comment')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get(':id')
  async getWholeComment(
    @Param() params,
    @Res() res
  ){
    const postId = params.id;
    let wholeCommentData = await this.commentsService.getWholeComment(postId);
    res.send(JSON.stringify(wholeCommentData));
  }

  @Post()
  @UseGuards(LoginGuard)
  async createPost(
    @Body(ValidationPipe) createCommentDTO: CreateCommentDTO,
    @Req() req,
    @Res() res
  ){

    const { comment, postId } = createCommentDTO;
    const userId : string = req.userId;

    let params = {
      postId: postId,
      userId: userId,
      comment : comment,
    }

    let newCommentRes = await this.commentsService.createComment(params);
    res.send(JSON.stringify(newCommentRes));
  }

  @Patch()
  @UseGuards(LoginGuard)
  async patchComment(
    @Body(ValidationPipe) updateCommentDTO: UpdateCommentDTO,
    @Req() req,
    @Res() res
  ){
    // parsed in LoginGuard
    const userId : string = req.userId;

    const { commentId, comment } = updateCommentDTO;

    let params = {
      userId: userId,
      commentId: commentId,
      comment: comment,
    };

    let updateCommentRes = await this.commentsService.patchComment(params);
    res.send(JSON.stringify(updateCommentRes));
  }

  @Delete()
  @UseGuards(LoginGuard)
  async deleteComment(
    @Body(ValidationPipe) deleteCommentDTO: DeleteCommentDTO,
    @Req() req,
    @Res() res
  ){
    // parsed in LoginGuard
    const userId : string = req.userId;

    const { commentId } = deleteCommentDTO;

    let params = {
      userId: userId,
      commentId: commentId,
    };

    let deleteCommentRes = await this.commentsService.deleteComment(params);
    res.send(JSON.stringify(deleteCommentRes));
  }



}
