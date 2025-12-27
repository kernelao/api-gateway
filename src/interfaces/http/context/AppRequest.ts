import type { Request } from 'express';
import type { RequestContext } from '@/application/shared/RequestContext';

/**
 * AppRequest (Gateway)
 * -------------------
 * Typage local du Request HTTP pour le Gateway.
 */
export type AppRequest = Request & {
  requestContext?: RequestContext;
};
