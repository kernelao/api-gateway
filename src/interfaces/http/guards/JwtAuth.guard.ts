import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import type { Request } from 'express';

import type { AppRequest } from '@/interfaces/http/context/AppRequest';
import { DI } from '@/application/shared/di';
import type { JwtVerifierPort } from 'libs/shared-auth/jwt/JwtVerifier.port';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject(DI.JwtVerifier)
    private readonly jwt: JwtVerifierPort,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest<AppRequest>();

    const token = extractBearer(req);
    if (!token) throw new UnauthorizedException('Missing token');

    const claims = await this.jwt.verifyAccessToken({ token });

    // a ameliorer...
    req.requestContext = {
      ...(req.requestContext ?? {
        requestId: 'missing',
        correlationId: 'missing',
      }),
      isGuest: false,
      userId: claims.sub,
    };

    return true;
  }
}

function extractBearer(req: Request): string | null {
  const h = req.header('authorization') ?? '';
  const m = /^Bearer\s+(.+)$/i.exec(h);
  return m?.[1] ?? null;
}
