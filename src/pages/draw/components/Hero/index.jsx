import { useState } from 'react';
import { View, Image, Swiper, SwiperItem } from '@tarojs/components';
import * as cx from 'classnames';
import styles from './index.module.scss';

export default function Hero({ data = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleChange = (e) => {
    const { current } = e.detail;
    setCurrentIndex(current);
  };

  return (
    <View className={styles['hero']}>
      <Swiper vertical={false} circular className={styles['hero__swiper']} onChange={handleChange}>
        {data?.map((item) => {
          return (
            <SwiperItem className={styles['hero__swiper__item']} key={item.id}>
              <Image src={`${CMS_URL}${item?.attributes?.url}`} mode='aspectFill'></Image>
            </SwiperItem>
          );
        })}
      </Swiper>
      <View className={styles['hero__swiper__indicator']}>
        {data?.map((item, index) => {
          const itemClass = cx([
            styles['hero__swiper__indicator__item'],
            {
              [styles['hero__swiper__indicator__item__active']]: currentIndex === index,
            },
          ]);
          return <View className={itemClass} key={item.id}></View>;
        })}
      </View>
    </View>
  );
}
