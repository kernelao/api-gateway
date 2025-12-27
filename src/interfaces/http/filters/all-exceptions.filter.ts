import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';
import { AuthError } from 'libs/shared-auth/jwt/AuthError';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    // 1) AuthError => 401
    if (exception instanceof AuthError) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        statusCode: HttpStatus.UNAUTHORIZED,
        code: exception.code,
        message: exception.message,
      });
      return;
    }

    // 2) HttpException => status normal
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const payload = exception.getResponse();
      res
        .status(status)
        .json(typeof payload === 'string' ? { statusCode: status, message: payload } : payload);
      return;
    }

    // 3) fallback
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    });
  }
}
