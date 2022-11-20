//
// ServiceModules contain services which is provided by this app
//
import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [UsersModule, PostsModule],
  exports: [UsersModule, PostsModule],
})
export class ServiceModules {}
