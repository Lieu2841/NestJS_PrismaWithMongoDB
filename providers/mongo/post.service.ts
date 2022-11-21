import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User, Post, Comment, Counter, Prisma } from '@prisma/client';

let postCounterId : string;

@Injectable()
export class PostMongoService {
  constructor(private prisma: PrismaService) {
    this.setPostCounterId();
  }

  async getPost(
    postWhereUniqueInput: Prisma.PostWhereUniqueInput,
  ): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: postWhereUniqueInput,
    });
  }

  async createPost(data: Prisma.PostCreateInput): Promise<Post> {
    return this.prisma.post.create({
      data,
    });
  }

  async getPostNumber_IncreaseNumber() : Promise<number> {
    let counter : Counter = await this.getPostCounter();
    await this.IncreasePostCounter(counter);
    let number = counter.no;
    return number
  }

  async getPostCounter() : Promise<Counter> {
    let getPostCounter : Prisma.CounterWhereUniqueInput = {
      id : postCounterId
    }
    let counter : Counter = await this.prisma.counter.findUnique({where : getPostCounter});
    return counter
  }

  async IncreasePostCounter(counter : Counter) : Promise<any> {
    let whereClue : Prisma.CounterWhereUniqueInput = {
      id: postCounterId
    }
    let updateNumberData : Prisma.CounterUpdateInput = {
      no: counter.no + 1
    }

    await this.prisma.counter.update({
      where: whereClue,
      data: updateNumberData,
    });
    return
  }

  async setPostCounterId(){
    let getPostCounter : Prisma.CounterWhereUniqueInput = {
      target: "Post"
    }
    let counter : Counter = await this.prisma.counter.findUnique({where : getPostCounter});
    postCounterId = counter.id;
  }

  async updatePost(params: {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUpdateInput;
  }): Promise<Post> {
    const { where, data } = params;
    return this.prisma.post.update({
      data,
      where,
    });
  }













}