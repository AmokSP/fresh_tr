import { memo, useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { arrow_right } from '@assets/icons';
import { jumpToStoreMP } from '@utils/methods';
import useStore from '@stores';
import { PAGES } from '@app.config';
import { isIOS } from '@utils/index';

import styles from './index.module.scss';

type RetailerProps = {
  retailerConfig: any;
  onChange?: (t: any) => void;
};

export default memo(({ onChange = undefined, retailerConfig = {} }: RetailerProps) => {
  const [isSwitchTabPage, setIsSwitchTabPage] = useState<boolean>(false);

  const _retailerConfig = retailerConfig.filter((item) => item?.dfsInfo?.data);

  const store = useStore();
  const handleJump = (mp) => {
    jumpToStoreMP(mp);
  };

  useEffect(() => {
    const isSwitchPage = Taro.getCurrentPages().find((i) => '/' + i.route === PAGES.CATEGORY);
    if (isSwitchPage) {
      !isIOS() && setIsSwitchTabPage(true);
    }
  }, []);

  return (
    <View className={styles['dropdown']}>
      <View
        className={styles['dropdown__body']}
        style={{ paddingBottom: isSwitchTabPage ? '70px' : '37px' }}
      >
        <View className={styles['dropdown__body__title']}>可选择前往以下免税商城购买</View>
        {_retailerConfig?.map((item, index) => {
          const icon = store.dfs[item?.dfsInfo?.data?.id];
          return (
            <View
              className={styles['dropdown__body__item']}
              key={index}
              onClick={() => handleJump(item)}
            >
              <View className={styles['dropdown__body__item__container']}>
                <Image
                  className={styles['dropdown__body__item__container__retailer-img']}
                  mode='aspectFit'
                  src={`${BUCKET_URL}${icon}`}
                ></Image>
                <View>{item?.dfsInfo?.data?.attributes?.title}</View>
              </View>
              <Image
                className={styles['dropdown__body__item__arrow']}
                mode='widthFix'
                src={arrow_right}
              ></Image>
            </View>
          );
        })}
      </View>
    </View>
  );
});
