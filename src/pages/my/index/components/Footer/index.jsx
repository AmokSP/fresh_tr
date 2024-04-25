import { useState } from 'react';
import { View, Button } from '@tarojs/components';
import { useTranslation } from 'react-i18next';
import Taro from '@tarojs/taro';
import PrivacyAuth from '@components/PrivacyAuth';
import { PAGES } from '@app.config';
import { goto } from '@utils';
import styles from './index.module.scss';

export default function Footer() {
  const [initPrivacy, setInitPrivacy] = useState(false);
  const { t } = useTranslation();

  const handleAgreePrivacyAuthorization = () => {
    setInitPrivacy(true);
    Taro.chooseAddress();
  };

  const handleStore = () => {
    goto({ url: PAGES.STORE });
  };

  return (
    <View className={styles['footer']}>
      <View className={styles['footer__list']}>
        <View
          className={styles['footer__list__item']}
          onClick={() => {
            goto({ url: `${PAGES.POLICY_STORE}` });
          }}
        >
          {t('common.storePolicy')} &gt;
        </View>
        <View
          className={styles['footer__list__item']}
          onClick={() => {
            goto({ url: `${PAGES.POLICY}?name=termsAndConditions` });
          }}
        >
          {t('common.termsAndPolicy')} &gt;
        </View>
        <Button
          // openType="agreePrivacyAuthorization"
          className={styles['footer__list__item']}
          onClick={handleStore}
        >
          {t('common.storeLocation')} &gt;
        </Button>
        <Button
          // openType="agreePrivacyAuthorization"
          className={styles['footer__list__item']}
          onClick={handleAgreePrivacyAuthorization}
        >
          {t('common.myAddress')} &gt;
        </Button>
      </View>
      <PrivacyAuth init={initPrivacy} />
    </View>
  );
}
