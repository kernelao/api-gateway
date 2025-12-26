import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { JwtAccessClaims, JwtVerifierPort } from '@/../libs/shared-auth';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject('JwtVerifierPort') private readonly verifier: JwtVerifierPort) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    const authHeader = req.headers['authorization'];
    const token = this.extractBearerToken(typeof authHeader === 'string' ? authHeader : undefined);
    if (!token) throw new UnauthorizedException();

    let claims: JwtAccessClaims;
    try {
      claims = await this.verifier.verifyAccessToken({ token });
    } catch (e: any) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    if (!claims?.sub) throw new UnauthorizedException();

    // On garde ça simple: on colle les claims sur req pour les handlers downstream
    (req as any).auth = { userId: claims.sub, claims };

    return true;
  }

  private extractBearerToken(header: string | undefined): string | null {
    const value = (header ?? '').trim();
    if (!value.toLowerCase().startsWith('bearer ')) return null;
    const token = value.slice(7).trim();
    return token.length ? token : null;
  }
}
