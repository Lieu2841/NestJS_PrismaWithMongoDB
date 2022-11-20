//
// ServiceModules contain services which is provided by this app
//
import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  exports: [UsersModule],
})
export class ServiceModules {}
