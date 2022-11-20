//
// AppModules contain reusable features using in whole apps!
//
import { Module } from '@nestjs/common';

import { CryptoModule } from './crypto/crypto.module';

@Module({
  imports: [CryptoModule],
  exports: [CryptoModule],
})
export class AppModules {}
