import React, { useState } from 'react';
import './index.scss';
import { PageContainer, View, Image, Block, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import ArrowDown from '@assets/icons/arrow-down.svg';
import cx from 'classnames';
import AllTemplates from '@hideaway/assets/poster/templates';
import AllStickers from '@hideaway/assets/poster/stickers';

type StickerPopupProps = {
  show: boolean;
  selectedTemplate: string;
  selectedStickers: number[];
  onSelectTemplate?: (id: string) => void;
  onAddSticker?: (id: number) => void;
  onRemoveSticker?: (id: number) => void;
  onClose?: () => void;
};
export default React.memo((props: StickerPopupProps) => {
  const { selectedTemplate, selectedStickers, onAddSticker, onRemoveSticker, onSelectTemplate } =
    props;
  const [view, setView] = useState<'sticker' | 'template'>('template');
  const toggleSticker = (sticker) => {
    if (selectedStickers.includes(sticker.id)) {
      onRemoveSticker?.(sticker.id);
    } else {
      if (selectedStickers.length >= 6) {
        return Taro.showToast({ icon: 'none', title: '最多可选择6个贴纸' });
      }
      onAddSticker?.(sticker.id);
    }
  };
  return (
    <View className={cx('sticker-popup', { show: props.show })}>
      <View className='popup-header'>
        <View
          onClick={() => setView('template')}
          className={cx('view-item', { active: view === 'template' })}
        >
          模板
        </View>
        <View style={{ color: '#897968' }}>|</View>
        <View
          onClick={() => setView('sticker')}
          className={cx('view-item', { active: view === 'sticker' })}
        >
          贴纸
        </View>
        <Image onClick={props.onClose} className='close' src={ArrowDown} />
      </View>

      {view === 'template' && (
        <View className={cx('options', view)}>
          {Object.values(AllTemplates).map((i) => (
            <View
              onClick={() => onSelectTemplate?.(i.id)}
              className={cx('option t-option', {
                active: selectedTemplate === i.id,
              })}
            >
              <Image src={i.preview}></Image>
            </View>
          ))}
        </View>
      )}
      {view === 'sticker' && (
        <ScrollView scrollY className={cx('options', view)}>
          <View className='stickers'>
            {Object.values(AllStickers).map((i) => (
              <View
                onClick={() => toggleSticker(i)}
                className={cx('option s-option', { active: selectedStickers.includes(i.id) })}
              >
                <Image lazyLoad src={i.src} mode='aspectFit'></Image>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
});
