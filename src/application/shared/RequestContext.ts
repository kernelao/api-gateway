export type RequestContext = {
  requestId: string;
  correlationId: string;

  // auth
  isGuest: boolean;
  userId?: string;
};
