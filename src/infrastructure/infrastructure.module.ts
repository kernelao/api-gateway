import { Module } from '@nestjs/common';
import { createJwtVerifierProvider } from '@/../libs/shared-auth';

@Module({
  providers: [createJwtVerifierProvider()],
  exports: ['JwtVerifierPort'],
})
export class InfrastructureModule {}
