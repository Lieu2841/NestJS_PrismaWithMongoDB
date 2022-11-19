/*
    ProvidersModule contain external connection modules
*/
import { Module } from '@nestjs/common';
import { MongodbModule } from './mongo/mongo.module';

@Module({
  imports: [MongodbModule],
  exports: [MongodbModule],
})
export class ProviderModules {}