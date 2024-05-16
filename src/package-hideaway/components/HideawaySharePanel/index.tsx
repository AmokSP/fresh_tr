import { View, Text, Image } from '@tarojs/components';
import React from 'react';
import Taro from '@tarojs/taro';
import HideawayPopup, { HideawayPopupProps } from '@components/HideawayPopup';
import IconOff from './off.svg';
import IconOn from './on.svg';
import './index.scss';
import { goto } from '@utils';
import { HIDEAWAY } from '@app.config';
interface SharePanelProps extends HideawayPopupProps {
  giftCount?: number;
  receivedCount?: number;
}
export default React.memo((props: SharePanelProps) => {
  const { receivedCount = 0, giftCount = 0 } = props;
  return (
    <HideawayPopup show={props.show} onClose={props.onClose}>
      <View className='share-panel'>
        <View>
          <View className='share-panel__desc'>
            分享旅行手账至微信好友，每三位好友打卡成功即可获得惊喜豪礼。
            <Text className='underline' onClick={() => goto({ url: HIDEAWAY.GAME_RULE })}>
              详细规则
            </Text>
          </View>
          <View className='share-panel__title'>好友打卡状态</View>
          <View className='share-panel__friends'>
            <View className='share-panel__friends__friend'>
              <Image src={receivedCount % 3 >= 1 ? IconOn : IconOff}></Image>
              <View>好友1</View>
            </View>
            <View className='share-panel__friends__friend'>
              <Image src={receivedCount % 3 >= 2 ? IconOn : IconOff}></Image>
              <View>好友2</View>
            </View>
            <View className='share-panel__friends__friend'>
              <Image src={IconOff}></Image>
              <View>好友3</View>
            </View>
          </View>
          <View className='share-panel__redeemed'>
            <Text>已获得豪礼：</Text>
            <Text className='share-panel__redeemed__count'>{giftCount ?? 0}</Text>
            <Text></Text>
          </View>
        </View>
        <View className='share-panel__cta-con'>{props.children}</View>
      </View>
    </HideawayPopup>
  );
});
