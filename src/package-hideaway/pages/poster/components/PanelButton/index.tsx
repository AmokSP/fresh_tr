import React, { CSSProperties, useEffect } from 'react';
import { View, Image } from '@tarojs/components';
import './index.scss';
import Arrow from './arrow.svg';
import Navbar, { NAVBAR_HEIGHT } from '@components/Basic/Navbar';
import useBoolean from '@hooks/useBoolean';
import cx from 'classnames';
export default React.memo(
  ({
    ready = true,
    open = false,
    onClick,
  }: {
    open?: boolean;
    ready?: boolean;
    onClick?: () => void;
  }) => {
    const [openFlag, openPanel, closePanel, toggle] = useBoolean(open);
    useEffect(() => {
      if (open) {
        openPanel();
      } else {
        closePanel();
      }
    }, [open]);
    return (
      <View
        className={cx('panel-btn-wrapper', {
          open: openFlag,
        })}
        style={{ top: NAVBAR_HEIGHT + 20 }}
      >
        <View className='pill-button primary'>
          <Image className='arrow' src={Arrow} onClick={ready ? toggle : undefined}></Image>
          <View className='label' onClick={onClick}>
            保存
          </View>
        </View>
      </View>
    );
  }
);
