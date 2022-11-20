//
// AppModules contain reusable features using in whole apps!
//
import { Module } from '@nestjs/common';

import { CryptoModule } from './crypto/crypto.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CryptoModule, AuthModule],
  exports: [CryptoModule, AuthModule],
})
export class AppModules {}
