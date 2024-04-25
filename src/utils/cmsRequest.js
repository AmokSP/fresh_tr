import Taro from '@tarojs/taro';
import storage from '@utils/storage';
import { showToast, hideLoading, appendParamsToUrl } from '@utils';

const request = (params) => {
  return new Promise((resolve, reject) => {
    const header = {
      Authorization: `Bearer ${CMS_TOKEN}`,
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
      dataType: 'json',
      timeout: 10000,
      success: (res) => {
        if (res.statusCode >= 500) {
          reject('Network Error');
          hideLoading();
          showToast({
            title: '网络错误',
            duration: 3000,
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
