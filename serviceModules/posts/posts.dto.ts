import { IsString } from 'class-validator';

export class createPostDTO {
  @IsString()
  title: string;

  @IsString()
  body: string;
}