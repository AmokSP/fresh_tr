import { useEffect, useState, useRef } from 'react';
import { View, Text, Button, RootPortal } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import { goto } from '@utils';
import { PAGES } from '@app.config';

export default function PrivacyAuth({
  init = false,
  onAuth,
  children,
}: {
  init?: boolean;
  onAuth?: () => void;
  children?: JSX.Element;
}) {
  const [show, setShow] = useState(false);
  const resolveRef = useRef<any>(null);

  useEffect(() => {
    Taro?.onNeedPrivacyAuthorization((resovle) => {
      resolveRef.current = resovle;
      setShow(true);
    });
    if (init) {
      try {
        Taro?.getPrivacySetting({
          success: (res) => {
            console.log('privacy', res);
            if (res.needAuthorization) {
              setShow(true);
            } else {
              onAuth && onAuth();
            }
          },
        });
      } catch (e) {}
    }
  }, [init]);

  const handleContract = () => {
    Taro.openPrivacyContract();
  };
  const handePrivacy = () => {
    goto({ url: `${PAGES.POLICY}?name=private` });
  };
  const handleAgreePrivacy = () => {
    if (resolveRef.current) {
      resolveRef.current({ buttonId: 'agree-btn', event: 'agree' });
    }
    setShow(false);
    onAuth?.();
  };
  const handleClose = () => {
    if (resolveRef.current) {
      resolveRef.current({ event: 'disagree' });
    }
    setShow(false);
  };
  if (!show) return;
  return (
    <RootPortal>
      <View className={styles['privacyAuth']} catchMove>
        <View className={styles['privacyAuth__panel']}>
          <View className={styles['privacyAuth__panel__content']}>
            在您使用Fresh馥蕾诗悦享之旅小程序服务之前，请仔细阅读并同意
            <Text onClick={handleContract}>《Fresh馥蕾诗悦享之旅小程序隐私保护指引》</Text>和
            <Text onClick={handePrivacy}>《个人信息处理规则（标准版）》</Text>。
          </View>
          <View>{children}</View>
          <Button
            id='agree-btn'
            openType='agreePrivacyAuthorization'
            className={styles['privacyAuth__panel__button']}
            onAgreePrivacyAuthorization={handleAgreePrivacy}
          >
            同意并继续
          </Button>
          <View className={styles['privacyAuth__panel__close']} onClick={handleClose}>
            <Text className='iconfont icon-close'></Text>
          </View>
        </View>
      </View>
    </RootPortal>
  );
}
