import { Controller, UseGuards, ValidationPipe, Param, Body, Req, Res, Get, Post, Patch, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';

import { createPostDTO } from './posts.dto';

import { LoginGuard } from '../../appModules/auth/auth.guard';

@Controller('/post')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(LoginGuard)
  async createPost(
    @Body(ValidationPipe) createPostDTO: createPostDTO,
    @Req() req,
    @Res() res
  ){

    const { title, body } = createPostDTO;
    const userId : string = req.userId;

    let params = {
      authorId : userId,
      title: title,
      body: body
    }

    let newPostRes = await this.postsService.createPost(params);
    res.send(JSON.stringify(newPostRes));
  }



}
