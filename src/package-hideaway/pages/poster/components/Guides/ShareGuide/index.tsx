import { View, Image, Text, Block } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { useEffect, useState } from 'react';
import './index.scss';
import IconFinger from '../assets/finger.svg';
import IconShare from '@hideaway/assets/poster/icons/share.svg';
import IconDownload from '@hideaway/assets/poster/icons/download.svg';
import useBoolean from '@hooks/useBoolean';
import cx from 'classnames';
import { NAVBAR_HEIGHT } from '@components/Basic/Navbar';
export default React.memo(() => {
  // const [guideRead, setGuideRead] = useBoolean(Taro.getStorageSync('share_guide_read') ?? false);

  return (
    <View className={cx('share-guide')}>
      <Image
        style={{ marginTop: `${NAVBAR_HEIGHT}px` }}
        className='finger download-finger'
        src={IconFinger}
      ></Image>
      <View className='cta'>确认</View>
      <View style={{ marginTop: `${NAVBAR_HEIGHT}px` }} className='texts download-text'>
        下载到相册
      </View>

      <Image
        style={{ marginTop: `${NAVBAR_HEIGHT}px` }}
        className='finger share-finger'
        src={IconFinger}
      ></Image>
      <View style={{ marginTop: `${NAVBAR_HEIGHT}px` }} className='texts share-text'>
        分享给好友
      </View>
    </View>
  );
});
