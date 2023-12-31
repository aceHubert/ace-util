/**
 * Returns an array of items from an overloaded rest parameter.
 * @param overloadedArray An array of items or an array of arrays of items.
 * @returns An array of items.
 * @example getArrayFromOverloadedRest([1, 2, 3]) // [1, 2, 3]
 * @example getArrayFromOverloadedRest(1, 2, 3) // [1, 2, 3]
 */
export function getArrayFromOverloadedRest<T>(overloadedArray: Array<T | T[]>): T[] {
  let items: T[];
  if (Array.isArray(overloadedArray[0])) {
    items = overloadedArray[0] as T[];
  } else {
    items = overloadedArray as T[];
  }
  return items;
}
