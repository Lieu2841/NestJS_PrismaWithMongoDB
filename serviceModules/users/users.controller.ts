import { Controller, UseGuards, ValidationPipe, Param, Body, Req, Res, Get, Post, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';

import { newUserDTO, loginUserDTO } from './users.dto';

import { LoginGuard } from '../../appModules/auth/auth.guard';

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

  @Post('/login')
  async loginUser(
    @Body(ValidationPipe) loginUserDTO: loginUserDTO,
    @Res() res
  ){
    const { email, pass } = loginUserDTO;

    let params = {
      email : email,
      pass: pass
    }

    // Need to use generated loginToken in frontside
    // or in backside, use res.header
    let loginUserRes = await this.usersService.loginUser(params);
    res.send(JSON.stringify(loginUserRes));
  }

  @Patch()
  @UseGuards(LoginGuard)
  async patchUser(
    @Req() req,
    @Res() res
  ){
    // parsed in LoginGuard
    let userId : string = req.userId;

    let params = {
      id: userId,
      pass: undefined,
      name: undefined
    };
    if(req.body.pass) params.pass = String(req.body.pass);
    if(req.body.name) params.name = String(req.body.name);

    let updateUserRes = await this.usersService.patchUser(params);
    res.send(JSON.stringify(updateUserRes));
  }

  @Delete()
  @UseGuards(LoginGuard)
  async deleteUser(
    @Req() req,
    @Res() res
  ){
    // parsed in LoginGuard
    let userId : string = req.userId;

    let isDeleteSuccess = await this.usersService.deleteUser(userId);
    if(isDeleteSuccess) res.send(JSON.stringify({error: false}));
    else res.send(JSON.stringify({error: true}));
  }

}
