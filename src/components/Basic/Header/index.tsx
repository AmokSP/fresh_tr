import React, { ReactNode, useState } from 'react';
import Taro, { usePageScroll, useRouter } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import * as Icons from '@assets/icons';
import Logo from '@assets/logo-large.png';
import styles from './index.module.scss';
import { PAGES } from '@app.config';
import cx from 'classnames';

export type HeaderProps = {
  buttonBack?: boolean;
  buttonHome?: boolean;
  transparent?: boolean | 'auto' | number;
  title?: string | 'brand_logo';
  titleColor?: string;
  transparentTitleColor?: string;
  titlePosition?: string;
  onClickBack?: () => void;
  onClickHome?: () => void;
  children?: ReactNode;
};

const menuButtonRect = Taro.getMenuButtonBoundingClientRect();
const { windowWidth } = Taro.getSystemInfoSync();

/**
 * @description: Custom display header content
 * @param  buttonBack  show back button,
 * @param  buttonHome  show home button,
 * @param  title title content,
 * @param  titleColor title color,
 * @param  titlePosition title position,
 * @return {*}   Custom header content component
 */
export default React.memo(
  ({
    buttonBack = false,
    transparent = false,
    buttonHome = false,
    title = undefined,
    titleColor = '#000',
    transparentTitleColor = 'transparent',
    titlePosition = 'center',
    onClickBack = () => {
      Taro.navigateBack({
        delta: 1,
        fail: () => {
          Taro.reLaunch({ url: PAGES.INDEX });
        },
      });
    },
    onClickHome = () => {
      Taro.switchTab({ url: PAGES.INDEX });
    },
    children,
  }: HeaderProps) => {
    const router = useRouter();
    const currentPageLength = Taro.getCurrentPages().length;
    const threshold =
      typeof transparent === 'number' ? transparent : transparent === 'auto' ? 35 : 0;
    const [transparentHeader, setTransparentHeader] = useState(
      typeof transparent === 'boolean' ? transparent : true
    );
    usePageScroll((e) => {
      if (transparent === 'auto') {
        if (e.scrollTop > threshold && transparentHeader) {
          setTransparentHeader(false);
        } else if (e.scrollTop <= threshold && !transparentHeader) {
          setTransparentHeader(true);
        }
      }
    });

    return (
      <View className={styles['header']}>
        <View
          className={cx(styles['buttons'], styles['flex'], styles['align-center'])}
          style={{
            paddingRight: `${
              windowWidth - menuButtonRect.left + (windowWidth - menuButtonRect.right) * 2
            }px`,
          }}
        >
          {(currentPageLength > 1 || buttonBack) && (
            <View className={styles['arrow-left']} onClick={onClickBack}>
              <Image
                src={transparentHeader ? Icons.arrow_back : Icons.arrow_back}
                className={cx(styles['header-icon'], styles['img'])}
                mode='widthFix'
              />
            </View>
          )}
          {buttonHome && currentPageLength === 1 && (
            <View className={styles['home']} onClick={onClickHome}>
              <Image
                src={transparentHeader ? Icons.arrow_back : Icons.arrow_back}
                className={cx(styles['header-icon'], styles['img'])}
                mode='widthFix'
              ></Image>
            </View>
          )}
          {process.env.NODE_ENV !== 'production' && (
            <Text
              style={{
                color: 'red',
                textTransform: 'uppercase',
                position: 'fixed',
                top: '10rpx',
                left: '24rpx',
                zIndex: 9999,
                fontSize: '24rpx',
              }}
            >
              {process.env.NODE_ENV}
            </Text>
          )}
        </View>
        {title &&
          (title === 'brand_logo' ? (
            <Image className={styles['brand-logo']} src={Logo} mode='widthFix'></Image>
          ) : (
            <View
              className={cx(styles['title'], { [`${titlePosition}`]: true })}
              style={{
                color: transparentHeader ? transparentTitleColor : titleColor,
              }}
            >
              {title}
            </View>
          ))}
        <View className={styles['header__content']}>{children}</View>
      </View>
    );
  }
);
