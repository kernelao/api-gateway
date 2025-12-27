export const DI = {
  JwtVerifier: Symbol('JwtVerifierPort'),
  IdentityPort: Symbol('IdentityPort'),
  HttpClient: Symbol('HttpClient'),
  ProxyUseCase: Symbol('ProxyUseCase'),
} as const;
