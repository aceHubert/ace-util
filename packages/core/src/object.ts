export type Many<T> = T | ReadonlyArray<T>;

/**
 * Empty function
 */
export const noop: any = (_: any) => _;

const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop,
};

/**
 * Proxy to a getter/setter
 * @param target target
 * @param key key
 * @param get get
 * @param set set
 */
export function proxy(target: any, key: string, { get, set }: { get?: Function; set?: Function } = {}) {
  sharedPropertyDefinition.get = get || noop;
  sharedPropertyDefinition.set = set || noop;
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

/**
 * Alias to Object.defineProperty
 */
export function def(
  obj: Record<string, any>,
  key: string,
  val: any,
  {
    enumerable = false,
    writable = true,
    configurable = true,
  }: { enumerable?: boolean; writable?: boolean; configurable?: boolean } = {},
) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable,
    writable,
    configurable,
  });
}

const hasOwnProperty = Object.prototype.hasOwnProperty;
export function hasOwn(obj: Record<string, any> | any[], key: string): boolean {
  return hasOwnProperty.call(obj, key);
}

/**
 * omit keys from object
 */
export function omit<T extends object, K extends keyof T>(obj: T, keys: Array<K>): Pick<T, Exclude<keyof T, K>>;
export function omit<T extends object, K extends keyof T>(obj: T, ...keys: Array<K>): Pick<T, Exclude<keyof T, K>>;
export function omit<T extends object, K extends keyof T>(
  obj: T,
  ...keys: Array<Many<K>>
): Pick<T, Exclude<keyof T, K>> {
  const flatKeys = keys.map((key) => (Array.isArray(key) ? key : [key])).flat() as Array<K>;
  if (!flatKeys.length) return obj;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [flatKeys.pop()!]: omitted, ...rest } = obj;
  return omit(rest as T, flatKeys);
}

/**
 * pick keys from object
 */
export function pick<T extends object, K extends keyof T>(obj: T, keys: Array<K>): Pick<T, K>;
export function pick<T extends object, K extends keyof T>(obj: T, ...keys: Array<K>): Pick<T, K>;
export function pick<T extends object, K extends keyof T>(obj: T, ...keys: Array<Many<K>>): Pick<T, K> {
  const flatKeys = keys.map((key) => (Array.isArray(key) ? key : [key])).flat() as Array<K>;
  if (!flatKeys.length) return obj;
  return flatKeys.reduce((prev, key) => {
    prev[key] = obj[key];
    return prev;
  }, {} as Pick<T, K>);
}
