/**
 * check if a value is a promise
 */
export function isPromise<T = any>(obj: any): obj is Promise<T> {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

/**
 * transform a value to a promise
 */
export function promisify<T>(promise: T | PromiseLike<T>): Promise<T> {
  if (promise && promise instanceof Promise && typeof promise.then === 'function') {
    return promise;
  }
  return Promise.resolve(promise);
}
