import { hasOwn } from '@ace-util/core';
import { Inject } from './Inject';

// Types
import { InjectFunction, InjectResult } from './types';

/**
 * create a new Inject instance
 * @param store Store
 */
export function createInject<T extends Record<string, (...args: any) => any> = {}>(
  store: { [K in keyof T]?: InstanceType<typeof Inject> } = {},
): InjectFunction<T> {
  function inject<K extends keyof T>(tag: K): InjectResult<T[K]>;
  function inject<K extends keyof T>(tag: K, functionToAdd: T[K], priority?: number, acceptedArgs?: number): void;
  function inject<K extends keyof T>(
    tag: K,
    functionToAdd?: T[K],
    priority?: number,
    acceptedArgs?: number,
  ): InjectResult<T[K]> | void {
    if (functionToAdd) {
      if (!hasOwn(store, tag)) {
        store[tag] = new Inject();
      }

      store[tag]!.addFilter(functionToAdd, priority, acceptedArgs);
    } else {
      return {
        has(functionToCheck: T[K] | boolean) {
          if (!hasOwn(store, tag)) {
            return false;
          }

          return store[tag]!.hasFilter(functionToCheck);
        },
        remove(functionToRemove: T[K], priority = 10) {
          let removed = false;
          if (hasOwn(store, tag)) {
            removed = store[tag]!.removeFilter(functionToRemove, priority);
          }
          return removed;
        },
        removeAll(priority: boolean | number) {
          if (hasOwn(store, tag)) {
            store[tag]!.removeAllFilters(priority);
          }
        },
        filter<T = unknown, R = T>(value: T, ...args: unknown[]) {
          if (hasOwn(store, 'all')) {
            // todo:apply tag "all" filter
          }

          if (hasOwn(store, tag)) {
            return store[tag]!.applyFilters<T, R>(value, ...args);
          }

          return Promise.resolve(value as unknown as R);
        },
        exec(...args: unknown[]) {
          if (hasOwn(store, tag)) {
            return store[tag]!.doAction(...args);
          }
          return Promise.resolve();
        },
      } as InjectResult<T[K]>;
    }
  }

  return inject;
}

/**
 * Global filters is used as singleton and can storage all inject callbacks;
 */
export const globalStorage = Inject.buildPreinitializedStorage({});

/**
 * Global Inject instalce
 */
export const globalInject = createInject(globalStorage);

export * from './types';
