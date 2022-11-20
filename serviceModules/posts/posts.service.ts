import { Injectable } from '@nestjs/common';

import { Prisma, User } from '@prisma/client';

import { CryptoService } from '../../appModules/crypto/crypto.service'
import { AuthService } from '../../appModules/auth/auth.service'

@Injectable()
export class PostsService {

  constructor(
    private authService : AuthService,
  ){}


}