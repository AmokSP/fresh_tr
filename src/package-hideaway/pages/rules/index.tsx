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

      <View className='title'>活动分享步骤及礼券领取规则</View>
      <View>
        1. 将馥蕾诗城市逸游指南/任一达人旅行手账/制作好的旅行手账以链接的形式分享给你的微信好友。
      </View>
      <View>2. 好友点击打开分享后的链接即视为分享成功。</View>
      <View>3. 每成功分享三位好友即可获得一张礼券，累加计算，多享多得。</View>
      <View>4. 礼券领取成功后，可前往您的礼券查看详情。</View>
      <View className='title'>礼品详情</View>
      <View>
        明星面膜尝鲜礼
        <View>
          兑换成功后，可随机获得红茶塑颜紧致睡眠面膜30ml或玫瑰润泽保湿舒缓面膜30ml一份，共75份，先到先得，赠完即止。
        </View>
        <View>或</View>
        感官悦动环保袋
        <View>
          兑换成功后，凭券于海南三亚国际免税城馥蕾诗店铺领取品牌限定环保袋一份，店铺信息请参考礼券详情。
        </View>
      </View>
      <View>
        <View className='title'>请注意:</View>
        <View>1.您分享的定制手账链接仅在7天内有效。失效后请尝试再次分享。</View>
        <View>2.礼券礼品随机发放，数量有限，请以当前领取状态为准。</View>
      </View>
    </View>
  );
}
