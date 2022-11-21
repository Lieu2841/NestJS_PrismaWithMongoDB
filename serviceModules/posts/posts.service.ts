import { Injectable } from '@nestjs/common';

import { Post, Prisma, User } from '@prisma/client';
import { PostMongoService } from '../../providers/mongo/post.service'

import { CryptoService } from '../../appModules/crypto/crypto.service'
import { AuthService } from '../../appModules/auth/auth.service'

@Injectable()
export class PostsService {

  constructor(
    private postMongoService: PostMongoService,
  ){}

  async createPost(params: {authorId: string, title: string, body: string}) : Promise<{error: boolean, post?: Post}> {

    let userWhereUniqueInput : Prisma.UserWhereUniqueInput = {
      id : params.authorId
    };

    let userCreateNestedOneWithoutPostsInput : Prisma.UserCreateNestedOneWithoutPostsInput = {
      connect : userWhereUniqueInput
    }

    let postNumber = await this.postMongoService.getPostNumber_IncreaseNumber();

    let newPost : Prisma.PostCreateInput = {
      no : postNumber,
      title: params.title,
      body: params.body,
      author: userCreateNestedOneWithoutPostsInput
    }

    let createdPost : Post;
    try{
      createdPost = await this.postMongoService.createPost(newPost);
    } catch(e){
      return {error : true}
    }

    return {error : false, post: createdPost}
  }

}