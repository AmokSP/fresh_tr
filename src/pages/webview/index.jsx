import { View, WebView } from '@tarojs/components';
import { useRouter, useShareAppMessage, useShareTimeline } from '@tarojs/taro';
import { PAGES } from '@app.config';
import { useTranslation } from 'react-i18next';
import CustomNav from '@components/CustomNav';
import styles from './index.module.scss';
import useStore from '@stores';
export default function WebPage() {
  const router = useRouter();
  const { params } = router;
  const { url, target, lang } = params;
  const { t } = useTranslation();
  const language = useStore((state) => state.language);

  useShareAppMessage(() => {
    return {
      title: t('common.shareTitle'),
      imageUrl: `${SHARE_IMAGE}?${+new Date()}`,
      path: `${PAGES.WEBVIEW}?url=${url}`,
    };
  });

  useShareTimeline(() => {
    return {
      title: t('common.shareTitle'),
      path: `${PAGES.WEBVIEW}?url=${url}`,
    };
  });

  const handleMessage = (e) => {
    console.log('postmessage', e);
  };

  return (
    <View>
      <View className='page'>
        <View className={styles['webview']}>
          <WebView
            src={
              target !== undefined
                ? `${H5_CAMPAIGN[target]}?lang=${lang ?? language}`
                : decodeURIComponent(url)
            }
            onMessage={handleMessage}
          ></WebView>
        </View>
      </View>
    </View>
  );
}
