export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ForwardRequest {
  method: HttpMethod;
  path: string; // ex: "/v1/me"
  headers?: Record<string, string | undefined>;
  query?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
}
