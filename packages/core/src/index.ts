import { MediaQueryDispatch } from '@ace-util/enquire';
/**
 * create a MediaQueryDispatch instance
 * @deprecated use `@ace-util/enquire` instead
 */
export function createMediaQueryDispatcher() {
  return new MediaQueryDispatch();
}

export * from './array';
export * from './device-type';
export * from './event-bus';
export * from './env';
export * from './json';
export * from './object';
export * from './path';
export * from './promise';
export * from './tools';
export * from './types';
export * from './version';
