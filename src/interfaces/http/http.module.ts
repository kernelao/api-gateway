import { Module } from '@nestjs/common';
import { ApplicationModule } from '@/application/application.module';
import { InfrastructureModule } from '@/infrastructure/infrastructure.module';

import { ProxyController } from './proxy/Proxy.controller';

@Module({
  imports: [ApplicationModule, InfrastructureModule],
  controllers: [ProxyController],
})
export class HttpModule {}
