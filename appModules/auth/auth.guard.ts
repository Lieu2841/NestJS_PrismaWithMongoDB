import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

/**
 * @header Need 'loginToken' value in request's header
 * @description Check login user and if logined user, save userId in request.userId
 */
@Injectable()
export class LoginGuard implements CanActivate {

  constructor(
    private readonly authService: AuthService,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    return this.authService.isValidUser(request, response);
  }
}