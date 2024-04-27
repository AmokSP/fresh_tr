import { View, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import TAB_BAR, { DFS_TAB_BAR } from '@constants/tabbar';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';
import useStore from '@stores';
import { isIOS } from '@utils';

import styles from './index.module.scss';

export default function Tabbar() {
  const store = useStore();
  const { t } = useTranslation();

  const handleSwitch = (item) => {
    Taro.reLaunch({
      url: item.pagePath,
    });
    store.setTabbarIndex(item.index);
  };

  const tabbarClass = cx([
    styles['tabbar'],
    {
      [styles['tabbar__ios']]: isIOS,
    },
  ]);
  const tabbarItems = [...(store.isFromDFS ? DFS_TAB_BAR : TAB_BAR)];
  const third = tabbarItems.splice(2, 1)[0];
  if (store.showRecommend) {
    tabbarItems.splice(2, 0, third);
  }
  return (
    <View className={tabbarClass}>
      <View className={styles['tabbar__wrap']}>
        {tabbarItems.map((item, index) => {
          const isActive = index === store.tabbar.activeIndex;
          const toggleClass = cx(styles['tabbar__item'], {
            [styles['tabbar__item__active']]: isActive,
          });
          const toggleIcon = isActive ? item.selectedIconPath : item.iconPath;
          return (
            <View className={toggleClass} key={item.index} onClick={() => handleSwitch(item)}>
              <View className={styles['tabbar__item__icon']}>
                {store.isFromDFS && index === 4 ? (
                  <Image
                    src={toggleIcon}
                    mode='aspectFit'
                    style={{
                      height: '36rpx',
                      width: '36rpx',
                    }}
                  ></Image>
                ) : (
                  <Image src={toggleIcon} mode={'heightFix'}></Image>
                )}
              </View>
              <View className={styles['tabbar__item__text']}>{t(`tabbar.${item?.langIndex}`)}</View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
