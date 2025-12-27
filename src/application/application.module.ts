import { Module } from '@nestjs/common';
import { ProxyUseCase } from './proxy/Proxy.usecase';
import { DI } from './shared/di';

@Module({
  providers: [
    {
      provide: DI.ProxyUseCase,
      useClass: ProxyUseCase,
    },
  ],
  exports: [DI.ProxyUseCase],
})
export class ApplicationModule {}
