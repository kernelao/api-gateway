import type { RequestContext } from '@/application/shared/RequestContext';
import { UnauthorizedError, UpstreamError } from '@/application/shared/AppError';

import type { IdentityPort } from '@/application/proxy/ports/IdentityPort';

export class ProxyUseCase {
  constructor(private readonly identity: IdentityPort) {}

  async me(ctx: RequestContext, params: { accessToken: string }) {
    if (!params.accessToken) {
      throw new UnauthorizedError('Missing access token');
    }

    try {
      return await this.identity.getMe({
        accessToken: params.accessToken,
        correlationId: ctx.correlationId,
      });
    } catch (e) {
      // Si l’identity renvoie 401/403/etc, l’adapter (infra) devrait déjà mapper ça
      // en AppError. Ici on garde une barrière de sécurité.
      if (e instanceof UnauthorizedError) throw e;

      throw new UpstreamError('Identity service error');
    }
  }
}
