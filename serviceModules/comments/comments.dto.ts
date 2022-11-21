import { IsString } from 'class-validator';

export class CreateCommentDTO {
  @IsString()
  comment: string;

  @IsString()
  postId: string;
}

export class UpdateCommentDTO {
  @IsString()
  commentId: string;

  @IsString()
  comment: string;
}
