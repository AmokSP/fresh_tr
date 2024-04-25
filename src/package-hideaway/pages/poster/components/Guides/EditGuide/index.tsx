import { View, Image, Text, Block } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { useEffect, useState } from 'react';
import './index.scss';
import PanelBtn from '@hideaway/assets/poster/icons/panel-btn.png';
import IconFinger from '../assets/finger.svg';
import FakePanel from '../assets/Panel.png';
import FakeSticker from '../assets/sticker.png';
import FakePhoto from '../assets/Photo.png';
import FakeText from '../assets/text.png';
import { NAVBAR_HEIGHT } from '@components/Basic/Navbar';
import useBoolean from '@hooks/useBoolean';
import cx from 'classnames';
export default React.memo(() => {
  // const [guideRead, setGuideRead] = useBoolean(false);
  const [guideRead, setGuideRead] = useBoolean(Taro.getStorageSync('edit_guide_read') ?? false);
  const [step, setStep] = useState(0);
  return guideRead ? (
    <Block></Block>
  ) : (
    <View className={cx('fullscreen-guide', `step${step}`)}>
      {
        [
          <Block>
            <Image
              style={{ top: NAVBAR_HEIGHT }}
              className='panel-btn'
              mode='widthFix'
              src={PanelBtn}
            ></Image>
            <Image className='panel' mode='widthFix' src={FakePanel}></Image>
            <Image className='finger panel-finger' src={IconFinger}></Image>
            <View className='text1'>
              <View>
                点击这里，下方会出现<Text className='span'>模版编辑，</Text>
              </View>
              <View>您可以选择您喜欢的模版，</View>
              <View>添加您喜欢的贴纸。</View>
            </View>
            <View className='rnd-btn btn-next' onClick={() => setStep(1)}>
              下一步
            </View>
          </Block>,
          <Block>
            <Image className='fake-sticker' src={FakeSticker}></Image>
            <Image className='finger sticker-finger' src={IconFinger}></Image>
            <View className='texts sticker-text'>贴纸替换</View>

            <Image className='fake-photo' src={FakePhoto}></Image>
            <Image className='finger photo-finger' src={IconFinger}></Image>
            <View className='texts photo-text'>照片上传</View>

            <Image className='fake-text' src={FakeText}></Image>
            <Image className='finger text-finger' src={IconFinger}></Image>
            <View className='texts text-text'>文案编辑</View>

            <Text className='text-done'>{`学会了\n开始制作自己的海报吧~`}</Text>
            <View
              className='rnd-btn btn-start'
              onClick={() => {
                setGuideRead();
                Taro.setStorageSync('edit_guide_read', true);
              }}
            >
              开始制作
            </View>
          </Block>,
        ][step]
      }
    </View>
  );
});
