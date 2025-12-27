import type { ForwardRequest } from '@/application/proxy/dtos/ForwardRequest';
import type { ForwardResponse } from '@/application/proxy/dtos/ForwardResponse';

export interface HttpClientPort {
  request<T = unknown>(req: ForwardRequest): Promise<ForwardResponse<T>>;
}
