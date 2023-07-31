/**
 * add slash to the end of the path
 * @param  path path
 * @returns path with slash
 */
export function trailingSlash(path: string) {
  return path.endsWith('/') ? path : `${path}/`;
}

/**
 * check if the path is an external link
 * @param {string} url url
 * @returns {boolean} true/false
 */
export function isAbsoluteUrl(url: string) {
  return /^(https?:\/\/|\/\/)[\w.]+\/?/gi.test(url);
}

/**
 * jump to the specified absolute url
 * @param {string} url target url
 * @param {boolean} replace use replace or not
 */
export function absoluteGo(url: string, replace = false) {
  try {
    window.location[replace ? 'replace' : 'assign'](url);
  } catch (e) {
    window.location.href = url;
  }
}

/**
 * Get value from search by specified key.
 * @param {string} key query key
 * @param {string} search search, default: location.search
 */
export const getQueryValue = function (key: string, search?: string) {
  const _search = search ? '&' + search : location.search.replace(/(^\?+)|(#\S*$)/g, '');
  const query = _search.match(new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i'));
  return !query ? '' : decodeURIComponent(query[2]);
};

/**
 * Get values from search by specified keys.
 * @param keys key query keys
 * @param search search, default: location.search
 */
export const getQueryValues = function (keys: string[], search?: string) {
  return keys.reduce((prev, curr) => {
    prev[curr] = getQueryValue(curr, search);
    return prev;
  }, {} as { [K in typeof keys[number]]: string });
};

/**
 * Set values to uri search
 * @param values key/value
 * @param url url string
 */
export const setQueryValues = function (values: Array<{ key: string; value: any }> | Record<string, any>, url: string) {
  let baseWithSearch = url.split('#')[0];
  const hash = url.split('#')[1];
  let arrayValues: Array<{ key: string; value: any }> = [];
  if (Array.isArray(values)) {
    arrayValues = values;
  } else {
    arrayValues = Object.entries(values).map(([key, value]) => ({ key, value }));
  }
  for (let i = 0; i < values.length; i++) {
    if (arrayValues[i].value !== undefined) {
      const newParam = arrayValues[i].key + '=' + arrayValues[i].value;
      if (baseWithSearch.indexOf('?') > 0) {
        const oldParamReg = new RegExp(arrayValues[i].key + '=[-\\w]{0,40}', 'g');
        if (oldParamReg.test(baseWithSearch)) {
          baseWithSearch = baseWithSearch.replace(oldParamReg, newParam);
        } else {
          baseWithSearch += '&' + newParam;
        }
      } else {
        baseWithSearch += '?' + newParam;
      }
    }
  }
  if (hash) {
    url = baseWithSearch + '#' + hash;
  } else {
    url = baseWithSearch;
  }
  return url;
};
