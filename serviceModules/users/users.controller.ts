import { Controller, ValidationPipe, Param, Body, Req, Res, Get, Post, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';

import { newUserDTO } from './users.dto';

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
  async addUser(
    @Body(ValidationPipe) newUserDTO: newUserDTO,
    @Res() res
  ){
    const { email, pass, name } = newUserDTO;

    let params = {
      email : email,
      pass: pass,
      name: name
    }

    let addUserRes = await this.usersService.addUser(params);
    res.send(JSON.stringify(addUserRes));
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
