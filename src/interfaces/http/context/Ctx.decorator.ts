import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { RequestContext } from '@/application/shared/RequestContext';
import type { AppRequest } from './AppRequest';

export const Ctx = createParamDecorator((_data: unknown, ctx: ExecutionContext): RequestContext => {
  const req = ctx.switchToHttp().getRequest<AppRequest>();
  return req.requestContext as RequestContext;
});
