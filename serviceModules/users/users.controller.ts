import { Controller, Req, Res, Get, Post, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUser(@Res() res){
    this.usersService.getUser();
    res.send('get_user_data');
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
