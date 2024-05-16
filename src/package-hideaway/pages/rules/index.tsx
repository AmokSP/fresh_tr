import React from 'react';
import Taro from '@tarojs/taro';

import './index.scss';
import { View } from '@tarojs/components';
import Navbar from '@components/Basic/Navbar';
import Header from '@components/Basic/Header';

export default function Rule() {
  return (
    <View className='hideaway-rule'>
      <Navbar holdPlace transparent={false}>
        <Header title={'活动规则'}></Header>
      </Navbar>

      <View className='title'>海报分享步骤及礼券领取规则</View>
      <View>1. 将制作好的旅行手账以链接的形式分享给你的微信好友。</View>
      <View>2. 好友点击打开分享后的链接即视为分享成功。</View>
      <View>3. 每成功分享三位好友即可获得一张礼券，多享多得。</View>
      <View>4. 礼券领取成功后，可前往您的礼券查看详情。</View>
      <View>5. 礼券数量有限，请以当前领取状态为准。</View>
      <View className='tip'>请注意：您分享的海报链接仅在7天内有效。失效后请尝试再次分享。</View>
    </View>
  );
}
