import { Controller, ValidationPipe, Param, Body, Req, Res, Get, Post, Patch, Delete } from '@nestjs/common';
import { constants } from 'buffer';
import { UsersService } from './users.service';

@Controller('/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async getOneUser(
    @Param() params,
    @Res() res
  ){
    const _id = params.id;
    let userData = await this.usersService.getOneUser(_id);
    if(!userData) res.send('There is no user');
    else res.send(JSON.stringify(userData));
  }

  @Post()
  async addUser(@Res() res){
    this.usersService.addUser();
    res.send('add_user_data');
  }

  @Patch()
  async patchUser(@Res() res){
    this.usersService.patchUser();
    res.send('update_user_data');
  }

  @Delete()
  async deleteUser(@Res() res){
    this.usersService.deleteUser();
    res.send('delete_user_data');
  }

}
