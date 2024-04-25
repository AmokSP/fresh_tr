import { View, Text, Image } from '@tarojs/components';
import React from 'react';
import Taro from '@tarojs/taro';
import HideawayPopup, { HideawayPopupProps } from '@components/HideawayPopup';
import IconOff from './off.svg';
import IconOn from './on.svg';
import './index.scss';
interface SharePanelProps extends HideawayPopupProps {
  summary?: number;
  receivedCount?: number;
}
export default React.memo((props: SharePanelProps) => {
  const { receivedCount = 0, summary = 0 } = props;
  return (
    <HideawayPopup show={props.show} onClose={props.onClose}>
      <View className='share-panel'>
        <View>
          <View className='share-panel__desc'>
            分享海报给好友，每三位好友打开链接后， 您可以获得一张礼券。多分享多得。
          </View>
          <View className='share-panel__title'>好友接受状态</View>
          <View className='share-panel__friends'>
            <View className='share-panel__friends__friend'>
              <Image src={summary % 3 >= 1 ? IconOn : IconOff}></Image>
              <View>好友1</View>
            </View>
            <View className='share-panel__friends__friend'>
              <Image src={summary % 3 >= 2 ? IconOn : IconOff}></Image>
              <View>好友2</View>
            </View>
            <View className='share-panel__friends__friend'>
              <Image src={IconOff}></Image>
              <View>好友3</View>
            </View>
          </View>
          <View className='share-panel__redeemed'>
            <Text>已获礼券数：</Text>
            <Text className='share-panel__redeemed__count'>{receivedCount}</Text>
            <Text>张</Text>
          </View>
        </View>
        <View className='share-panel__cta-con'>{props.children}</View>
      </View>
    </HideawayPopup>
  );
});
