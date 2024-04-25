import { useEffect, useState } from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import TAB_BAR from '@constants/tabbar';
import useStore from '@stores';
import { PAGES } from '@app.config';
// import HomeLogo from "@assets/logo-large.png";
import styles from './index.module.scss';

export default function CustomNav({
  title = '馥蕾诗免税小程序',
  collapsed,
  show = true,
  showNav = true,
  backgroundColor,
  children,
}) {
  const [showBack, setShowBack] = useState(false);

  const info = Taro.getSystemInfoSync();
  const menuInfo = Taro.getMenuButtonBoundingClientRect();
  const statusBarHeight = info.statusBarHeight;
  const menuButtonHeight = menuInfo.height;
  const gap = (menuInfo.top - statusBarHeight) * 2 + 4;
  const navBarHeight = statusBarHeight + menuButtonHeight + gap;

  const store = useStore();

  const setDefaultTabbar = () => {
    const pages = Taro.getCurrentPages();
    const path = pages[0].route;
    const index = TAB_BAR.findIndex((item) => item.pagePath.includes(path));
    store.setTabbarIndex(index);
  };

  useEffect(() => {
    store.setNavBarHeight(navBarHeight);
  }, []);

  useDidShow(() => {
    const pages = Taro.getCurrentPages();
    const isShowBack = pages.length > 1 ? true : false;
    setShowBack(isShowBack);
    setDefaultTabbar();
  });

  const handleBack = () => {
    Taro.navigateBack();
  };

  const handleHome = () => {
    Taro.reLaunch({
      url: PAGES.INDEX,
    });
  };

  return (
    <View
      className={styles['nav']}
      style={{
        height: collapsed ? '0px' : navBarHeight + 'px',
      }}
    >
      <View
        className={styles['nav__wrap']}
        style={{
          height: navBarHeight + 'px',
          backgroundColor,
          opacity: show ? 1 : 0,
        }}
      >
        <View className={styles['nav__content']} style={{ marginTop: statusBarHeight + 'px' }}>
          <View className={styles['nav__title']}>{title}</View>
        </View>
        {showNav && (
          <View className={styles['nav__icon']} style={{ marginTop: statusBarHeight + 'px' }}>
            {!showBack ? (
              <View className={styles['nav__icon__home']} onClick={handleHome}>
                {/* <Image src={HomeLogo} mode="widthFix"></Image> */}
                <Text className='iconfont icon-home'></Text>
              </View>
            ) : (
              <View className={styles['nav__icon__back']} onClick={handleBack}>
                <Text className='iconfont icon-prev'></Text>
              </View>
            )}
          </View>
        )}
      </View>
      <View
        className={styles['nav__custom']}
        style={{
          height: navBarHeight + 'px',
          paddingTop: statusBarHeight + 'px',
        }}
      >
        {children}
      </View>
    </View>
  );
}
