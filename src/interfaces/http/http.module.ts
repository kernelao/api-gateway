import { Module } from '@nestjs/common';

import { InfrastructureModule } from '@/infrastructure/infrastructure.module';

import { HealthController } from '@/interfaces/http/health/health.controller';
import { ProxyController } from '@/interfaces/http/proxy.controller';
import { JwtAuthGuard } from './guards/JwtAuth.guard';

@Module({
  imports: [InfrastructureModule],
  controllers: [HealthController, ProxyController],
  providers: [JwtAuthGuard],
})
export class HttpModule {}
