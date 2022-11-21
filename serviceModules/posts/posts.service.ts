import { Injectable } from '@nestjs/common';

import { Post, Prisma } from '@prisma/client';
import { PostMongoService } from '../../providers/mongo/post.service'

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

  async getOnePost(postId : string) : Promise<{error: boolean, post?: Post}> {
    let getPostParams : Prisma.PostWhereUniqueInput = {
      id: postId
    }

    let data : Post;
    try{
      data = await this.postMongoService.getPost(getPostParams);
    } catch(e){
      return {error: true}
    }

    if(data.isDeleted) return {error: true};
    
    return {error: false, post: data}
  }

  async patchPost(params : {userId : string, postId : string, title?: string | undefined, body?: string | undefined}) : Promise<{error: boolean, post?: Post}> {

    let getPostUniqueInput : Prisma.PostWhereUniqueInput = {
      id: params.postId,
    }

    let selectedPost : Post;
    try{
      selectedPost = await this.postMongoService.getPost(getPostUniqueInput);
    } catch(e){
      return {error: true}
    }
    if(selectedPost.authorId !== params.userId) return {error: true}

    let PostUpdateInput : Prisma.PostUpdateInput = {}
    if(params.title) PostUpdateInput.title = params.title;
    if(params.body) PostUpdateInput.body = params.body;

    try{
      selectedPost = await this.postMongoService.updatePost({
        where: getPostUniqueInput,
        data: PostUpdateInput
      });
    } catch(e){
      return {error: true}
    }
    
    return {error: false, post: selectedPost}
  }

  async deletePost(params : {userId : string, postId : string}) : Promise<{error: boolean}> {

    let getPostUniqueInput : Prisma.PostWhereUniqueInput = {
      id: params.postId,
    }

    let selectedPost : Post;
    try{
      selectedPost = await this.postMongoService.getPost(getPostUniqueInput);
    } catch(e){
      return {error: true}
    }
    if(selectedPost.authorId !== params.userId) return {error: true}

    try{
      await this.postMongoService.deletePost(getPostUniqueInput);
    } catch(e){
      return {error: true}
    }
    
    return {error: false}
  }

}