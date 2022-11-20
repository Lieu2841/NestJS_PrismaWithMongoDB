import { Controller, UseGuards, ValidationPipe, Param, Body, Req, Res, Get, Post, Patch, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';

import { } from './posts.dto';

import { LoginGuard } from '../../appModules/auth/auth.guard';

@Controller('/post')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}





}
