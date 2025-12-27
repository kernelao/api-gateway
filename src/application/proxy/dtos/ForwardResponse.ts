export interface ForwardResponse<T = unknown> {
  status: number;
  data: T;
  headers?: Record<string, string>;
}
