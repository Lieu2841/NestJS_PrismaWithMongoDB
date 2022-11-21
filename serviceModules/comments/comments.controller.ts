import { Controller, UseGuards, ValidationPipe, Param, Body, Req, Res, Get, Post, Patch, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';

import {  } from './comments.dto';

import { LoginGuard } from '../../appModules/auth/auth.guard';

@Controller('/post')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}



}
