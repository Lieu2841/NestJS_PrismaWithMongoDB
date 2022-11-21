import { Controller, UseGuards, ValidationPipe, Param, Body, Req, Res, Get, Post, Patch, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';

import { CreateCommentDTO } from './comments.dto';

import { LoginGuard } from '../../appModules/auth/auth.guard';

@Controller('/comment')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

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

}
