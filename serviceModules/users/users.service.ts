import { Injectable } from '@nestjs/common';

import { Prisma, User } from '@prisma/client';
import { UserService } from '../../providers/mongo/user.service'

import { CryptoService } from '../../appModules/crypto/crypto.service'

@Injectable()
export class UsersService {

  constructor(
    private userService: UserService,
    private cryptoService: CryptoService,
  ){}

  async getOneUser(_id : string) : Promise<object | boolean> {

    let getUserUniqueInput : Prisma.UserWhereUniqueInput = {
      id: _id,
    }

    let getUser : User;
    try{
      getUser = await this.userService.user(getUserUniqueInput);
    } catch(e){
      return false
    }

    if(getUser.isDeleted) return false

    let maskedEmail : string;
    let splitEmail = getUser.email.split('@');

    if(splitEmail[0].length > 0) splitEmail[0] = splitEmail[0][0] + '*'.repeat(splitEmail[0].length - 1);
    else splitEmail[0] = '*'.repeat(splitEmail[0].length);

    maskedEmail = splitEmail.join('');

    let returnUserData : object = {
      id: getUser.id,
      email : maskedEmail,
      name : getUser.name,
    }

    return returnUserData
  }

  async addUser(params : {email : string, pass: string, name: string}) : Promise<{error: boolean, id?: string}>{

    let hassedPass = await this.cryptoService.passwordEncrypt(params.pass);

    let createInput : Prisma.UserCreateInput = {
      email: params.email,
      pass: hassedPass,
      name: params.name
    };
    
    let createdUser : User
    try{
      createdUser = await this.userService.createUser(createInput);
    } catch(e){
      return {error: true}
    }

    return {error: false, id: createdUser.id}
  }

  async patchUser(){
  }

  async deleteUser(){
  }

}