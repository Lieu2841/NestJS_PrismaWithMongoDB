import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ProviderModules } from '../providers/index'
import { ServiceModules } from '../ServiceModules/index'

@Module({
  imports: [
    ProviderModules, 
    ServiceModules
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
