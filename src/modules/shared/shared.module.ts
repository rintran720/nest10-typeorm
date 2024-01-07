import { Module } from '@nestjs/common';
import { ConfigService } from './services/config.service';

const providers = [ConfigService];

@Module({
  providers: [...providers],
  exports: [...providers],
})
export class SharedModule {}
