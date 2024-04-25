import { useState } from 'react';
import useStore from '@stores';
import { View, Text, Image } from '@tarojs/components';
import { goto } from '@utils';
import { Tracking } from '@utils/tracking';
import styles from './index.module.scss';

export default function HomePopup({ onClose, onClick, data }) {
  const store = useStore();

  useState(() => {
    store.setHideHomePopup(true);
  }, []);

  const handleClose = () => {
    onClose && onClose();
  };
  return (
    <View className={styles['popup']} catchMove>
      <View className={styles['popup__panel']}>
        <Image
          src={`${CMS_URL}${data?.popupImg?.data?.attributes?.url}`}
          mode='aspectFill'
          onClick={() => {
            Tracking.trackEvent('h_popup');
            goto({ url: data?.popUpLink });
            handleClose();
          }}
        ></Image>
        <View className={styles['popup__panel__close']} onClick={handleClose}>
          <Text className='iconfont icon-close'></Text>
        </View>
        <View
          className={styles['popup__panel__button']}
          onClick={() => {
            Tracking.trackEvent('h_popup');
            onClick && onClick();
          }}
        ></View>
      </View>
    </View>
  );
}
