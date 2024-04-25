import Taro from '@tarojs/taro';
import storage from '@utils/storage';
import { TAB_PATHS, AUTH_PAGES } from '@constants';
import i18n from '@i18n';
import { PAGES } from '@app.config';

export const checkAuth = () => {
  const userInfo = storage.getItem('userInfo');
  const isLogin = userInfo?.profile?.status === 'Registered';
  if (!isLogin) {
    Taro.navigateTo({
      url: PAGES.SIGNUP,
    });
    return false;
  }
  return true;
};

export const appendParamsToUrl = (url, params) => {
  const query = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join('&');
  if (url.indexOf('?') === -1) {
    return `${url}?${query}`;
  } else {
    return `${url}&${query}`;
  }
};

export const buildObjectFromQuery = (query) => {
  const _query = decodeURIComponent(query);
  const arr = _query?.split('&');
  const queryObject = {};
  arr.forEach((item) => {
    const tmp = item?.split('=');
    queryObject[tmp[0]] = tmp[1];
  });
  return queryObject;
};

export const isIOS = () => {
  const info = Taro.getSystemInfoSync();
  const system = info.system.toLowerCase();
  if (/ios/gi.test(system)) {
    return true;
  }
  return false;
};

export const filterRichText = (content) => {
  let _content = content?.replace(/<p>/g, '<p class="fresh-p">');
  _content = _content?.replace(/<ul>/g, '<p class="fresh-ul">');
  return _content;
};

export const showLoading = (options) => {
  Taro.showLoading({
    title: i18n.t('loading.text'),
    mask: false,
    ...options,
  });
};

export const hideLoading = () => {
  Taro.hideLoading();
};

export const showToast = (options) => {
  Taro.showToast({
    icon: 'none',
    mask: true,
    ...options,
  });
};

export const hideToast = () => {
  Taro.hideToast();
};

export const showModal = (options) => {
  Taro.showModal({
    title: '提示',
    showCancel: true,
    content: '确定要删除？',
    ...options,
  });
};

export const delay = async (interval = 2000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
};

export const delayNavigateBack = async (interval = 2000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      Taro.getCurrentPages().length > 1 ? Taro.navigateBack() : Taro.reLaunch({ url: PAGES.INDEX });
      resolve();
    }, interval);
  });
};

export function getDistances(lat1, lng1, lat2, lng2) {
  let EARTH_RADIUS = 6378.137;
  let radLat1 = (lat1 * Math.PI) / 180.0;
  let radLat2 = (lat2 * Math.PI) / 180.0;
  let a = radLat1 - radLat2;
  let b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0;
  let s =
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(a / 2), 2) +
          Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)
      )
    );
  s = s * EARTH_RADIUS;
  s = Math.round(s * 10000) / 10000;
  return { m: s * 1000, km: Number(s.toFixed(2)) };
}

/**
 *
 * @param {*} options
 * type: navigateTo, redirectTo, reLaunch
 * interal link example: /pages/index/index
 * external link example: app://appId:path
 * webview link example: https://path
 */

export const goto = (options) => {
  let { type = 'navigateTo', url } = options;
  const isH5 = url?.startsWith('https://');
  const isApp = url?.startsWith('app://');

  if (isApp) {
    const params = url.split('app://')[1];
    const [appId, path] = params.split(':');
    Taro.navigateToMiniProgram({
      appId,
      path: path || 'pages/index/index',
    });
    return;
  }

  if (isH5) {
    url = `/pages/webview/index?url=${options?.url}`;
  }

  const index = AUTH_PAGES.findIndex((item) => item?.includes(url));
  if (index !== -1) {
    if (!checkAuth()) {
      return;
    }
  }

  const isTabPath = TAB_PATHS.some((item) => url?.includes(item));
  if (isTabPath) {
    console.log(url);
    type = 'reLaunch';
    // const query = url?.split('?');
    // if (query.length > 1) {
    //   const arr = query[1]?.split('&');
    //   const queryObject = {};
    //   arr.forEach((item) => {
    //     const tmp = item?.split('=');
    //     queryObject[tmp[0]] = tmp[1];
    //   });
    //   storage.setItem('query', queryObject);
    // }
  }

  Taro[type]({
    ...options,
    url,
    fail: (res) => {
      console.log(res);
    },
  });
};
