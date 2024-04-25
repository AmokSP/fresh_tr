import Taro from '@tarojs/taro';
import gdp from '@tracking/gio/gio-taro';
import storage from '@utils/storage';

// const taroRuntime = require("@tarojs/runtime");
// gdp("registerPlugins", [gioEventAutoTracking]);

export class Tracking {
  public static init() {
    gdp &&
      gdp('init', 'd4895e2b6fd8c0ba', TRACKING.gio.dataSourceId, 'wx6281517a1b117198', {
        version: '0.0.8',
        host: 'napi.growingio.com',
        taro: Taro,
        debug: true,
        forceLogin: true,
      });
  }

  public static trackEvent(eventId: string, params?: any) {
    const userInfo = storage.getItem('userInfo');
    const { openId } = userInfo?.profile;
    gdp &&
      gdp('track', eventId, {
        openId,
        ...params,
      });
  }

  public static setUserInfo(params: { openId: string; unionId?: string }) {
    gdp &&
      gdp('setUserAttributes', {
        $wechat_openId: params.openId,
        $wechat_unionId: params.unionId,
      });
  }

  public static setUserId(id: string) {
    gdp && gdp('setUserId', id);
  }
  public static identify(unionId: string) {
    gdp && gdp('identify', unionId);
  }
}
