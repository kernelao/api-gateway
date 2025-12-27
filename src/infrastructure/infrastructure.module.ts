import { Module } from '@nestjs/common';
import { readFileSync } from 'fs';

import { DI } from '@/application/shared/di';
import { JoseJwtVerifier } from 'libs/shared-auth/jwt/JoseJwtVerifier';

@Module({
  providers: [
    {
      provide: DI.JwtVerifier,
      useFactory: () => {
        const path = process.env.JWT_ACCESS_PUBLIC_KEY_PATH;
        if (!path) {
          throw new Error('JWT_ACCESS_PUBLIC_KEY_PATH missing');
        }

        const publicKeyPem = readFileSync(path, 'utf8');
        return new JoseJwtVerifier(publicKeyPem);
      },
    },
  ],
  exports: [DI.JwtVerifier],
})
export class InfrastructureModule {}
