import { Injectable } from '@nestjs/common';

import { Post, Prisma } from '@prisma/client';

import { CommentMongoService } from '../../providers/mongo/comment.service'

@Injectable()
export class CommentsService {

  constructor(
    private commentMongoService: CommentMongoService,
  ){}



}