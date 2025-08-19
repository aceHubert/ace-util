export function isWechat(ua = navigator.userAgent) {
  return /MicroMessenger/i.test(ua) && !/wxwork/i.test(ua);
}

export function isWechatWork(ua = navigator.userAgent) {
  return /MicroMessenger/i.test(ua) && /wxwork/i.test(ua);
}

export function isWeibo(ua = navigator.userAgent) {
  return /Weibo/i.test(ua);
}

export function isQQ(ua = navigator.userAgent) {
  return /QQ/i.test(ua);
}

export function isAlipay(ua = navigator.userAgent) {
  return /AlipayClient/i.test(ua);
}

export function isDingTalk(ua = navigator.userAgent) {
  return /DingTalk/i.test(ua);
}

export function isFeiShu(ua = navigator.userAgent) {
  return /Lark/i.test(ua);
}

export function isDouyin(ua = navigator.userAgent) {
  return /aweme/i.test(ua);
}

export function isMoible(ua = navigator.userAgent) {
  return /(HarmonyOS|Android|webOS|iPhone|iPod|tablet|BlackBerry|Mobile)/i.test(ua);
}

export function isIOS(ua = navigator.userAgent) {
  return /iPhone|iPad|iPod|iOS/i.test(ua);
}

export function isAndroid(ua = navigator.userAgent) {
  return /Android/i.test(ua);
}

export function isHarmonyOS(ua = navigator.userAgent) {
  return /HarmonyOS/i.test(ua);
}

export type MobileDeviceType = {
  type: 'mobile' | 'ios' | 'android' | 'harmonyos';
  env?: 'wechat' | 'wxwork' | 'alipay' | 'dingtalk' | 'feishu' | 'douyin' | 'weibo' | 'qq';
  masklayer?: boolean;
};

export type PcDeviceType = {
  type: 'pc';
  env?: 'wechat' | 'wxwork' | 'dingtalk' | 'feishu' | 'douyin' | 'weibo' | 'qq';
};

export type DeviceType = MobileDeviceType | PcDeviceType;

/**
 * 获取设备类型
 * @param {*} ua ,就是userAgent
 * @returns  type: 设备类型
 *           env: 访问环境(微信/微博/qq)
 *           masklayer: 就是给外部拿到判断是否显示遮罩层的,一些特殊环境要引导用户到外部去打开访问
 */
export function deviceType(ua = navigator.userAgent): DeviceType {
  const env = isWechat(ua)
    ? 'wechat'
    : isWechatWork(ua)
    ? 'wxwork'
    : isWeibo(ua)
    ? 'weibo'
    : isQQ(ua)
    ? 'qq'
    : isAlipay(ua)
    ? 'alipay'
    : isDingTalk(ua)
    ? 'dingtalk'
    : isFeiShu(ua)
    ? 'feishu'
    : isDouyin(ua)
    ? 'douyin'
    : undefined;
  if (isMoible(ua)) {
    return {
      type: isIOS(ua) ? 'ios' : isAndroid(ua) ? 'android' : isHarmonyOS(ua) ? 'harmonyos' : 'mobile',
      env,
      masklayer: !!env,
    };
  } else {
    return {
      type: 'pc',
      env: env as PcDeviceType['env'], // 部分应用没有桌面版
    };
  }
}

export enum BrowserType {
  IE = 'ie',
  Edge = 'edge',
  Firefox = 'firefox',
  Chrome = 'chrome',
  Opera = 'opera',
  Safari = 'safari',
}

/**
 * 获取浏览器类型
 * @param {*} ua ,就是userAgent
 * @returns  type: 浏览器类型
 *           version: 浏览器版本
 */
export function browserType(ua = navigator.userAgent): {
  type?: BrowserType;
  version?: string;
} {
  let ieTridents, trident, matchStr, ieAerRv, browserChiType: BrowserType | undefined;
  //判断IE 浏览器,
  //blog: http://blog.csdn.Net/aerchi/article/details/51697592
  if ('ActiveXObject' in self) {
    // ie_aer_rv:  指示IE 的版本.
    // It can be affected by the current document mode of IE.
    ieAerRv = (matchStr = ua.match(/msie ([\d.]+)/i))
      ? matchStr[1]
      : (matchStr = ua.match(/rv:([\d.]+)/i))
      ? matchStr[1]
      : 0;

    // ie: Indicate the really version of current IE browser.
    ieTridents = { 'trident/7.0': 11, 'trident/6.0': 10, 'trident/5.0': 9, 'trident/4.0': 8 };
    //匹配 ie8, ie11, edge
    trident = (matchStr = ua.match(/(trident\/[\d.]+|edge\/[\d.]+)/i)) ? matchStr[1] : undefined;
    browserChiType = trident && (ieTridents[trident] || ieAerRv) > 0 ? BrowserType.IE : undefined;
  } else {
    //判断 windows edge 浏览器
    // match_str[1]: 返回浏览器及版本号,如: "edge/13.10586"
    // match_str[1]: 返回版本号,如: "edge"

    //若要返回 "edge" 请把下行的 "ie" 换成 "edge"。 注意引号及冒号是英文状态下输入的
    browserChiType = (matchStr = ua.match(/edge\/([\d.]+)/i))
      ? BrowserType.Edge
      : //判断firefox 浏览器
      (matchStr = ua.match(/firefox\/([\d.]+)/i))
      ? BrowserType.Firefox
      : //判断chrome 浏览器
      (matchStr = ua.match(/chrome\/([\d.]+)/i))
      ? BrowserType.Chrome
      : //判断opera 浏览器
      (matchStr = ua.match(/opera.([\d.]+)/i))
      ? BrowserType.Opera
      : //判断safari 浏览器
      (matchStr = ua.match(/version\/([\d.]+).*safari/i))
      ? BrowserType.Safari
      : undefined;
  }

  const version = trident && ieTridents?.[trident] ? String(ieTridents[trident]) : matchStr?.[1];

  return {
    type: browserChiType,
    version,
  };
}
