import { Injectable } from '@nestjs/common';

import { Prisma, User } from '@prisma/client';
import { UserMongoService } from '../../providers/mongo/user.service'

import { CryptoService } from '../../appModules/crypto/crypto.service'
import { AuthService } from '../../appModules/auth/auth.service'

@Injectable()
export class UsersService {

  constructor(
    private userMongoService: UserMongoService,
    private cryptoService: CryptoService,
    private authService : AuthService,
  ){}

  async getOneUser(_id : string) : Promise<object | boolean> {

    let getUserUniqueInput : Prisma.UserWhereUniqueInput = {
      id: _id,
    }

    let getUser : User;
    try{
      getUser = await this.userMongoService.user(getUserUniqueInput);
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
      createdUser = await this.userMongoService.createUser(createInput);
    } catch(e){
      return {error: true}
    }

    return {error: false, id: createdUser.id}
  }

  async loginUser(params : {email : string, pass: string}) : Promise<{error: boolean, loginToken?: string}>{

    let getUserUniqueInput : Prisma.UserWhereUniqueInput = {
      email: params.email
    }

    let getUser : User;
    try{
      getUser = await this.userMongoService.user(getUserUniqueInput);
    } catch(e){
      return {error: true}
    }

    if(getUser.isDeleted) return {error: true};

    let hassedPass = await this.cryptoService.passwordEncrypt(params.pass);
    if(getUser.pass === hassedPass){
      let newLoginToken : string = await this.authService.genLoginToken(getUser.id);
      return {error: false, loginToken: newLoginToken}
    } else return {error: true}

  }

  async patchUser(params : {id : string, pass?: string | undefined, name?: string | undefined}) : Promise<{error: boolean}> {

    let getUserUniqueInput : Prisma.UserWhereUniqueInput = {
      id: params.id,
    }

    let UserUpdateInput : Prisma.UserUpdateInput = {}

    if(params.pass) UserUpdateInput.pass = await this.cryptoService.passwordEncrypt(params.pass);
    if(params.name) UserUpdateInput.name = params.name;

    try{
      await this.userMongoService.updateUser({
        where: getUserUniqueInput,
        data: UserUpdateInput
      });
    } catch(e){
      return {error: true}
    }
    
    return {error: false}
  }

  async deleteUser(id: string) : Promise<boolean> {

    let getUserUniqueInput : Prisma.UserWhereUniqueInput = {
      id: id,
    };

    try{
      await this.userMongoService.deleteUser(getUserUniqueInput);
    } catch(e){
      return true
    }

    return true
  }

}