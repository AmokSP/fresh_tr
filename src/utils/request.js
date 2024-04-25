import Taro from '@tarojs/taro';
import { showToast, hideLoading, appendParamsToUrl } from '@utils';
import storage from '@utils/storage';

const request = (params) => {
  return new Promise((resolve, reject) => {
    const userInfo = storage.getItem('userInfo');
    const token = userInfo.token || '';
    const header = {
      Authorization: `Bearer ${token}`,
    };

    let url = params.url;
    if (TRANSLATE_API) {
      let language = storage.getItem('language') || 'cn';
      language = language === 'cn' ? 'zh-CN' : 'zh-Hant';
      url = appendParamsToUrl(url, { locale: language });
    }

    Taro.request({
      url,
      method: params.method || 'GET',
      data: {
        ...params.data,
      },
      header: {
        ...header,
        ...params?.header,
      },
      dataType: params.dataType || 'json',
      responseType: params.responseType || 'text',
      timeout: 10000,
      success: (res) => {
        if (res.statusCode >= 500) {
          reject('Network Error');
          showToast({
            title: '网络错误',
          });
        } else {
          resolve(res.data);
        }
      },
      fail: (res) => {
        reject(res.errMsg);
      },
    });
  });
};

export default request;
