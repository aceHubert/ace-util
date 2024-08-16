import { warn } from './tools';

/**
 * Event bus
 */
export class EventBus {
  private events: Map<string, Array<Function>> = new Map();

  /**
   * 发射事件
   * @param {string} event 事件名称
   * @param {any} payload 事件载荷
   */
  emit(event: string, ...payload: any[]) {
    if (!this.events.has(event)) {
      warn(
        process.env.NODE_ENV === 'production',
        `event "${event}" is triggered, but no listeners，nothing will be happening.`,
      );
      return this;
    }
    for (const handler of this.events.get(event)!) {
      handler(...payload);
    }
    return this;
  }

  /**
   * 事件监听
   * @param event 事件名称
   * @param handler 处理事件的方法
   */
  on(event: string, handler: Function) {
    if (typeof handler === 'function') {
      if (!this.events.has(event)) this.events.set(event, []);
      this.events.get(event)!.push(handler);
    } else {
      warn(process.env.NODE_ENV === 'production', `handler must be a function, but recived ${typeof handler}`);
    }
    return this;
  }

  /**
   * 事件监听（只执行1次）
   * @param event 事件名称
   * @param handler 处理事件的方法
   */
  once(event: string, handler: Function) {
    if (typeof handler === 'function') {
      if (!this.events.has(event)) this.events.set(event, []);
      this.events.get(event)!.push((...payload: any[]) => {
        handler(...payload);
        this.off(event, handler);
      });
    } else {
      warn(process.env.NODE_ENV === 'production', `handler must be a function, but recived ${typeof handler}`);
    }
    return this;
  }

  /**
   * 取消事件监听
   * @param event 事件名称
   * @param handler 处理事件的方法
   */
  off(event: string, handler: Function) {
    let hasHandler = false,
      isHandlerFunction = false,
      handles = [] as Array<Function>;
    if (
      (hasHandler = this.events.has(event) && !!(handles = this.events.get(event)!).length) &&
      (isHandlerFunction = typeof handler === 'function')
    ) {
      const i = handles.findIndex((fn) => fn === handler);
      i >= 0 && handles.splice(i, 1);
    } else if (!hasHandler) {
      warn(process.env.NODE_ENV === 'production', `no event name of "${event}" is on listening`);
    } else if (!isHandlerFunction) {
      warn(process.env.NODE_ENV === 'production', `handler must be a function, but recived ${typeof handler}`);
    }
    return this;
  }

  /**
   * 清理事件总线
   */
  clear() {
    this.events = new Map();
    return this;
  }

  /**
   * 获取当前事件总线详情
   */
  getEvents() {
    return Object.freeze(this.events);
  }
}
