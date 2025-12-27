import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/interfaces/http/guards/JwtAuth.guard';
import { Ctx } from '@/interfaces/http/context/Ctx.decorator';
import type { RequestContext } from '@/application/shared/RequestContext';

@Controller('/v1')
export class ProxyController {
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  me(@Ctx() ctx: RequestContext) {
    return {
      userId: ctx.userId,
      isGuest: ctx.isGuest,
    };
  }
}
