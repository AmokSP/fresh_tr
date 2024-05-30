import React, { useState } from 'react';
import { View, Image, Block } from '@tarojs/components';
import useBoolean from '@hooks/useBoolean';
import Taro from '@tarojs/taro';
import './index.scss';
import Hand from './hand.svg';
export default React.memo(({ show }: { show: boolean }) => {
  const [guideRead, setGuideRead] = useBoolean(Taro.getStorageSync('swipe_guide_read') ?? false);

  return (
    <View
      className={`swipe-guide ${!guideRead && show && 'show'}`}
      onClick={() => {
        setGuideRead();
        Taro.setStorageSync('swipe_guide_read', true);
      }}
    >
      <Image src={Hand} className='hand'></Image>
      <View
        onClick={() => {
          setGuideRead();
          Taro.setStorageSync('swipe_guide_read', true);
        }}
        className='confirm'
      >
        确定
      </View>
    </View>
  );
});
