import React, { ReactNode } from 'react';
import { View, Image } from '@tarojs/components';
import Close from './close.svg';
import cx from 'classnames';
import Taro from '@tarojs/taro';
import './index.scss';
export type HideawayPopupProps = {
  show: boolean;
  children?: ReactNode;
  onClose?: () => void;
};
export default React.memo((props: HideawayPopupProps) => {
  return (
    <View className={cx('hideaway-popup', { show: props.show })}>
      <View className='popup-wrapper'>
        <Image src={Close} onClick={props.onClose} className='close-btn'></Image>
        <View>{props.children}</View>
      </View>
    </View>
  );
});
