import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/JwtAuth.guard';

@Controller('/v1')
export class ProxyController {
  @Get('/me')
  @UseGuards(JwtAuthGuard)
  me(@Req() req: any) {
    return {
      ok: true,
      userId: req.auth?.userId,
    };
  }
}
