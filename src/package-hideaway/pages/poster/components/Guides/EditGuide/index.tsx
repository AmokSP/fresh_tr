import { View, Image, Text, Block } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { useEffect, useState } from 'react';
import './index.scss';
import { useTranslation } from 'react-i18next';
import IconFinger from '../assets/finger.svg';
import FakePanel from '../assets/Panel.png';
import FakeSticker from '../assets/sticker.png';
import FakePhoto from '../assets/Photo.png';
import FakeText from '../assets/text.png';
import Arrow from '../../PanelButton/arrow.svg';
import { NAVBAR_HEIGHT } from '@components/Basic/Navbar';
import useBoolean from '@hooks/useBoolean';
import cx from 'classnames';
import PanelButton from '../../PanelButton';

export default React.memo(({ onClose }: { onClose?: () => void }) => {
  const [guideRead, setGuideRead] = useBoolean(Taro.getStorageSync('edit_guide_read') ?? false);
  // const [guideRead, setGuideRead] = useBoolean(false);
  const [step, setStep] = useState(0);
  const { t } = useTranslation();
  return guideRead ? (
    <Block></Block>
  ) : (
    <View className={cx('fullscreen-guide', `step${step}`)}>
      {
        [
          <Block>
            <PanelButton ready={false}></PanelButton>
            <Image className='panel' mode='widthFix' src={FakePanel}></Image>
            <Image className='finger save-finger' src={IconFinger}></Image>
            <Image className='finger panel-finger' src={IconFinger}></Image>
            <View className='text1'>
              <View>
                点击<Image src={Arrow}></Image>收起
              </View>
              <View style={{ marginTop: '84rpx' }}>点击【保存】生成手账预览</View>
            </View>
            <Text className='text2'>
              选择你喜欢的模板和贴纸{'\n'}设计属于你独一无二的{'\n'}旅行手账
            </Text>
            <View className='rnd-btn btn-next' onClick={() => setStep(1)}>
              下一步
            </View>
          </Block>,
          <Block>
            {/* <PanelButton ready={false} open={false}></PanelButton>
            <View className='text2'>
              点击<Image src={Arrow}></Image>展开
            </View> */}
            <Image className='fake-sticker' src={FakeSticker}></Image>
            <Image className='finger sticker-finger' src={IconFinger}></Image>
            <View className='texts sticker-text'>贴纸替换</View>

            <Image className='fake-photo' src={FakePhoto} mode='aspectFit'></Image>
            <Image className='finger photo-finger' src={IconFinger}></Image>
            <View className='texts photo-text'>照片上传</View>

            <Image className='fake-text' src={FakeText}></Image>
            <Image className='finger text-finger' src={IconFinger}></Image>
            <View className='texts text-text'>文案编辑</View>

            <Text className='text-done'>{`学习完毕\n开始创作属于你的旅行手账吧！`}</Text>
            <View
              className='rnd-btn btn-start'
              onClick={() => {
                // if (!policyChecked) return showToast({ title: t('signup.error.policy') });
                setGuideRead();
                Taro.setStorageSync('edit_guide_read', true);
                onClose?.();
              }}
            >
              开始创作
            </View>
            {/* <View className={'policy'} onClick={togglePolicy}>
              <View
                className={`policy__checkbox ${policyChecked ? 'policy__checkbox__active' : ''}`}
              >
                <Text className={`${'policy__checkbox__icon'} iconfont icon-right`}></Text>
              </View>
              <View className={'policy__text'}>
                {t('signup.policy.part1')}
                <Text
                  className='text_link'
                  onClick={(e) => {
                    e.stopPropagation();
                    goto({ url: `${PAGES.POLICY}?name=private` });
                  }}
                >
                  {t('signup.policy.link')}
                </Text>
                {t('signup.policy.part2')}
                <Text
                  className='text_link'
                  onClick={(e) => {
                    e.stopPropagation();
                    goto({ url: `${PAGES.POLICY}?name=private` });
                  }}
                >
                  {t('signup.policy.link')}
                </Text>
                {t('signup.policy.part3')}
              </View>
            </View> */}
          </Block>,
        ][step]
      }
    </View>
  );
});
