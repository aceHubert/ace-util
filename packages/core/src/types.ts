/**
 * check if value is undefined
 * @param val value
 * @returns true/false
 */
export function isUndef(val: unknown): val is undefined {
  return val === void 0;
}

/**
 * check if value is a array
 * @param val value
 * @returns true/false
 */
export function isArray(val: unknown): val is any[] {
  return Array.isArray(val);
}

/**
 * check if value is an object
 * @param val value
 * @returns true/false
 */
export function isObject(val: unknown): val is Record<any, any> {
  return val !== null && typeof val === 'object';
}

const toString = (x: any) => Object.prototype.toString.call(x);
/**
 * check if value is a plain object
 * @param val value
 * @returns true/false
 */
export function isPlainObject(val: unknown): val is Record<any, any> {
  return toString(val) === '[object Object]';
}

/**
 * check if value is a function
 * @param val value
 * @returns true/false
 */
export function isFunction(val: unknown): val is Function {
  return typeof val === 'function';
}

/**
 * Inlined Object.is polyfill.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
export function objectIs(x: any, y: any): boolean {
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  }
  // eslint-disable-next-line
  return x !== x && y !== y;
}

/**
 * check if value is primitive
 * https://developer.mozilla.org/en-US/docs/Glossary/Primitive
 * @param val value
 * @returns true/false
 */
export function isPrimitive(val: any): boolean {
  return (
    typeof val === 'string' ||
    typeof val === 'number' ||
    typeof val === 'symbol' ||
    typeof val === 'boolean' ||
    typeof val === 'bigint' ||
    typeof val === 'undefined' ||
    val === null
  );
}

/**
 * compare two values are fully equal
 * @param x value x
 * @param y value y
 * @returns true/false
 */
export function equals(x: any, y: any): boolean {
  const f1 = x instanceof Object;
  const f2 = y instanceof Object;
  if (!f1 || !f2) {
    return x === y;
  }
  if (Object.keys(x).length !== Object.keys(y).length) {
    return false;
  }
  const newX = Object.keys(x);
  for (let p in newX) {
    p = newX[p];
    const a = x[p] instanceof Object;
    const b = y[p] instanceof Object;
    if ((a && b && !equals(x[p], y[p])) || (!(a && b) && x[p] !== y[p])) {
      return false;
    }
  }
  return true;
}
