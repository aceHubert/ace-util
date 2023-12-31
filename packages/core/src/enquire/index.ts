/**
 * https://github.com/WickyNilliams/enquire.js 不支持优化的
 * fork from https://github.com/youzan/zent/pull/1282/commits
 */

import { MediaQueryDispatch } from './MediaQueryDispatch';

/**
 * create a MediaQueryDispatch instance
 * @returns MediaQueryDispatch instance
 */
export function createMediaQueryDispatcher() {
  return new MediaQueryDispatch();
}
