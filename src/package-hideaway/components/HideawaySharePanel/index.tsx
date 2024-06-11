import { View, Text, Image } from '@tarojs/components';
import React from 'react';
import Taro, { useRouter } from '@tarojs/taro';
import HideawayPopup, { HideawayPopupProps } from '@components/HideawayPopup';
import IconOff from './off.svg';
import IconOn from './on.svg';
import './index.scss';
import { goto } from '@utils';
import { HIDEAWAY } from '@app.config';
import SkyBg from '@hideaway/assets/book/background';
import Title from './title.png';
import Box from './box';
interface SharePanelProps extends HideawayPopupProps {
  giftCount?: number;
  receivedCount?: number;
}
export default React.memo((props: SharePanelProps) => {
  const { receivedCount = 0, giftCount = 0 } = props;
  const router = useRouter();
  console.log(router.path);
  let text = '';
  switch (router.path) {
    case HIDEAWAY.INDEX:
      text = '分享馥蕾诗城市逸游指南至微信好友，每三位好友打卡成功即可获得惊喜豪礼。';
      break;
    case HIDEAWAY.KOL_STORY:
      text = '分享达人旅行手账至微信好友，每三位好友打卡成功即可获得惊喜豪礼。';
      break;
    case HIDEAWAY.POSTER:
    case HIDEAWAY.POSTER_SHARE:
      text = '分享我的旅行手账至微信好友，每三位好友打卡成功即可获得惊喜豪礼。';
      break;
  }
  return (
    <HideawayPopup
      style={{
        backgroundImage: `url(${SkyBg})`,
        backgroundPosition: 'top',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
      show={props.show}
      onClose={props.onClose}
    >
      <View className='share-panel'>
        <View>
          <View className='share-panel__desc'>
            <View>{text}</View>
            <View className='underline' onClick={() => goto({ url: HIDEAWAY.GAME_RULE })}>
              详细规则
            </View>
          </View>
          <Image className='share-panel__title' src={Title}></Image>
          <View
            className='share-panel__friends'
            style={{
              backgroundImage: `url(${Box})`,
              backgroundPosition: 'top',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <View className='share-panel__friends__friend'>
              <Image src={receivedCount % 3 >= 1 ? IconOn : IconOff}></Image>
              <View>{receivedCount % 3 >= 1 ? '已打卡' : '未打卡'}</View>
            </View>
            <View className='share-panel__friends__friend'>
              <Image src={receivedCount % 3 >= 2 ? IconOn : IconOff}></Image>
              <View>{receivedCount % 3 >= 2 ? '已打卡' : '未打卡'}</View>
            </View>
            <View className='share-panel__friends__friend'>
              <Image src={IconOff}></Image>
              <View>未打卡</View>
            </View>
          </View>
          <View className='share-panel__redeemed'>
            <Text>已获得豪礼：</Text>
            <Text className='share-panel__redeemed__count'>{giftCount ?? 0}</Text>
            <Text>张</Text>
          </View>
        </View>
        <View className='share-panel__cta-con'>{props.children}</View>
      </View>
    </HideawayPopup>
  );
});
