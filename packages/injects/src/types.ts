/**
 * Inject result
 */
export type InjectResult = {
  /**
   * Has function form injection
   * @param functionToCheck Function to check
   */
  has(functionToCheck?: Function | boolean): Function | boolean;
  /**
   * Remove function form injection
   * @param functionToRemove Function to remove
   * @param priority Priority
   */
  remove(functionToRemove: Function, priority?: number): boolean;
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
  filter<T = unknown, R = T>(value: T, ...args: unknown[]): Promise<R>;

  /**
   * Execute from injection tag, won't have a return value
   * @param args Arguments
   */
  exec(...args: unknown[]): Promise<void>;
};

/**
 * Injection instance
 */
export interface InjectFunction {
  /**
   * Execute a tag
   */
  (tag: string): InjectResult;
  /**
   * Inject function to a tag
   */
  (tag: string, functionToAdd: Function, priority?: number, acceptedArgs?: number): void;
}
