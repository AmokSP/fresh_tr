import { useDidShow } from '@tarojs/taro';
import storage from '@utils/storage';
import useLogin from '@hooks/useLogin';
import useDFS from '@hooks/useDFS';
import useStore from '@stores';

import { Tracking } from '@utils/tracking';
import { buildObjectFromQuery } from '@utils';

import './i18n';
import './app.scss';

Tracking.init();

function App({ children }) {
  const store = useStore();
  useLogin();
  useDFS();
  useDidShow((options) => {
    console.log('options', options);
    const { scene, lang, utm_source, utm_medium, utm_campaign, dfs } = options.query;
    if (utm_source || utm_medium || utm_campaign) {
      store.setUtm(utm_source, utm_medium, utm_campaign);
    }
    if (lang) {
      store.setLanguage(lang.toLowerCase());
    }
    const params = buildObjectFromQuery(scene);
    if (params?.lang) {
      store.setLanguage(params.lang.toLowerCase());
    }
    const sign = options?.referrerInfo?.extraData?.sign;
    store.setSign(sign);
    store.setFromDFS(true);
    if (dfs || params?.dfs === 'true') {
    }

    // const profile = storage.getItem("userInfo")?.profile;
    // if (profile) {
    //   const unionId = profile?.unionId;
    //   const openId = profile?.openId;
    //   const accountId = store?.userInfo?.accountId;
    //   Tracking.init();
    //   Tracking.setUserInfo({ openId, unionId });
    //   Tracking.setUserId(accountId);
    //   Tracking.identify(unionId);
    // }
  });

  return children;
}

export default App;
