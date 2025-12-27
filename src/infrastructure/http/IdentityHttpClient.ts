import type { IdentityMeDto, IdentityPort } from '@/application/proxy/ports/IdentityPort';
import { ForbiddenError, UnauthorizedError, UpstreamError } from '@/application/shared/AppError';

export class IdentityHttpClient implements IdentityPort {
  constructor(private readonly baseUrl: string) {}

  async getMe(params: { accessToken: string; correlationId?: string }): Promise<IdentityMeDto> {
    const url = `${this.baseUrl}/v1/me`;

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${params.accessToken}`,
        'Content-Type': 'application/json',
        ...(params.correlationId ? { 'x-correlation-id': params.correlationId } : {}),
      },
    });

    // Map erreurs upstream -> AppError (le controller/filter saura quoi faire)
    if (res.status === 401) {
      throw new UnauthorizedError('Invalid or expired token');
    }
    if (res.status === 403) {
      throw new ForbiddenError('Forbidden');
    }
    if (!res.ok) {
      const txt = await safeReadText(res);
      throw new UpstreamError(`Identity error (${res.status}): ${txt ?? 'unknown'}`);
    }

    const data = (await res.json()) as IdentityMeDto;
    return data;
  }
}

async function safeReadText(res: Response): Promise<string | null> {
  try {
    return await res.text();
  } catch {
    return null;
  }
}
