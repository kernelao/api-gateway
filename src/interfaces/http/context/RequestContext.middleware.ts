import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Response, NextFunction } from 'express';

import type { AppRequest } from './AppRequest';
import type { RequestContext } from '@/application/shared/RequestContext';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  use(req: AppRequest, _res: Response, next: NextFunction): void {
    const requestId = (req.header('x-request-id') ?? '').trim();
    const correlationId = (req.header('x-correlation-id') ?? '').trim();

    const ctx: RequestContext = {
      requestId: requestId || 'missing',
      correlationId: correlationId || 'missing',
      isGuest: true,
    };

    req.requestContext = ctx;
    next();
  }
}
