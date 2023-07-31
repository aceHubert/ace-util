import get from 'lodash.get';

/**
 * get key from object
 * @param key key
 * @param defaultValue default value
 * @param obj object, default: process.env
 * @returns value
 * @example getEnv('NODE_ENV', 'development')
 * @example getEnv('a.b.c', 0, {a: {b: {c: 1}}}})
 */
export const getEnv = <R = any>(key: string, defaultValue: R, obj: object = process.env): R => {
  return get(obj || {}, key, defaultValue);
};


