import { useEffect, useState, useRef } from 'react';
import { View, Text, Button, RootPortal } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';

export default function PrivacyAuth({ init = false, onAuth = undefined }) {
  const [show, setShow] = useState(false);
  const resolveRef = useRef(null);

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
  const handleAgreePrivacy = () => {
    if (resolveRef.current) {
      resolveRef.current({ buttonId: 'agree-btn', event: 'agree' });
    }
    setShow(false);
    onAuth && onAuth();
  };
  const handleClose = () => {
    if (resolveRef.current) {
      resolveRef.current({ event: 'disagree' });
    }
    setShow(false);
  };
  return (
    <>
      {show && (
        <RootPortal>
          <View className={styles['privacyAuth']} catchMove>
            <View className={styles['privacyAuth__panel']}>
              <View className={styles['privacyAuth__panel__content']}>
                在你使用Fresh馥蕾诗悦享之旅小程序服务之前，请仔细阅读
                <Text onClick={handleContract}>《Fresh馥蕾诗悦享之旅小程序隐私保护指引》</Text>
                。如你同意
                <Text onClick={handleContract}>《Fresh馥蕾诗悦享之旅小程序隐私保护指引》</Text>
                ，请点击“同意”开始使用Fresh馥蕾诗悦享之旅小程序服务。
              </View>
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
      )}
    </>
  );
}
