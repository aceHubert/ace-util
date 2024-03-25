import get from 'lodash.get';

/**
 * get key from object
 * @param path path
 * @param defaultValue default value
 * @param obj object, default: process.env
 * @returns env value
 * @example getEnv('NODE_ENV', 'development')
 * @example getEnv('a.b.c', 0, {a: {b: {c: 1}}}})
 */
export const getEnv = <R = any>(path: string | number, defaultValue: R, obj: object = process.env): R => {
  return get(obj || {}, path, defaultValue);
};

/**
 * get key from object or throw error
 * @param key key
 * @param obj object, default: process.env
 * @returns env value
 * @example getEnvOrThrow('NODE_ENV')
 */
export const getEnvOrThrow = <R = any>(path: string | number, obj: object = process.env): R => {
  const value = get(obj || {}, path);
  if (value === undefined) {
    throw new Error(`env ${path} is required`);
  }
  return value;
};
