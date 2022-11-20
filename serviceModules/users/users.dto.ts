import { IsString, IsEmail } from 'class-validator';

export class newUserDTO {
  @IsEmail()
  email: string;

  @IsString()
  pass: string;

  @IsString()
  name: string;
}

export class loginUserDTO {
  @IsEmail()
  email: string;

  @IsString()
  pass: string;
}