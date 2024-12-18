type GetRestArgs<T extends any[]> = T extends [infer A, ...infer B] ? B : never;

/**
 * Inject result
 */
export type InjectResult<F extends (...args: any) => any> = {
  /**
   * Has function form injection
   * @param functionToCheck Function to check
   */
  has(functionToCheck?: F | boolean): F | boolean;
  /**
   * Remove function form injection
   * @param functionToRemove Function to remove
   * @param priority Priority
   */
  remove(functionToRemove: F, priority?: number): boolean;
  /**
   * Remove all functions form injection
   * @param priority Priority
   */
  removeAll(priority: boolean | number): void;
  /**
   * Filter from injection tag, will always have a return value
   * @param value Value to filter
   * @param args Arguments
   */
  filter(value: Parameters<F>[0], ...args: GetRestArgs<Parameters<F>>): Promise<Parameters<F>[0]>;

  /**
   * Execute from injection tag, won't have a return value
   * @param args Arguments
   */
  exec(...args: Parameters<F>): Promise<void>;
};

/**
 * Injection instance
 */
export interface InjectFunction<T extends Record<string, (...args: any) => any>> {
  /**
   * Execute a tag
   */
  <K extends keyof T>(tag: K): InjectResult<T[K]>;
  /**
   * Inject function to a tag
   */
  <K extends keyof T>(tag: K, functionToAdd: T[K], priority?: number, acceptedArgs?: number): void;
}
