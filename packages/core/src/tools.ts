/**
 * check Symbol support
 * @returns true/false
 */
export const hasSymbol = typeof Symbol === 'function' && Symbol.for;

/**
 * warn if condition is not pass
 * @param condition condition
 * @param format format
 * @param args args
 */
export function warn(condition: boolean, format: string, ...args: any[]) {
  if (format === undefined) {
    throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
  }

  if (!condition) {
    let argIndex = 0;
    const message =
      '[warn]: ' +
      format.replace(/%s/g, function () {
        return args[argIndex++];
      });
    if (typeof console !== 'undefined') {
      // eslint-disable-next-line no-console
      console.error(message);
    }
  }
}


/**
 * throw error if condition is not pass
 * @param condition condition
 * @param err error message or error object
 */
export function assert(condition: boolean, err: string | Error) {
  if (!condition) {
    throw typeof err === 'string' ? new Error(`error: ${err}`) : err;
  }
}

/**
 * print a colorful message in console
 * @param title title
 * @param content content
 */
export function print(title: string, content: string) {
  // eslint-disable-next-line no-console
  console.log(
    `%c${title}%c${content}`,
    'background: #00d1b2; padding: 5px; color: #fff; border-radius: 5px 0 0 5px',
    'background: #555; padding: 5px; color: #fff; border-radius: 0 5px 5px 0',
  );
}
