import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ProviderModules } from '../providers/index'

@Module({
  imports: [ProviderModules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
