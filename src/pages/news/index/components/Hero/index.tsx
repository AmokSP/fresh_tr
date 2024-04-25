import React, { useEffect, useState } from 'react';
import { View, Swiper, SwiperItem, Image } from '@tarojs/components';
import { PointService } from '@api/point.services';
import { TASK } from '@constants/index';
import { goto } from '@utils/index';
import { Tracking } from '@utils/tracking';
import cx from 'classnames';
import styles from './index.module.scss';

export default React.memo(({ data }: any) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [bannerList, setBanners] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setBanners(data?.liveStreamingImgs?.data);
    }
  }, [data]);

  const handleClick = () => {
    const link = data?.bannerRedirectLink;
    const task = data?.task;
    if (link) {
      goto({ url: link });
      task === 'live' && PointService.fireTask({ name: TASK.Subscribe_LS });
      task === 'game' && PointService.fireTask({ name: TASK.Play_GAME });
    }
    task === 'live' && Tracking.trackEvent('n_webinar');
    task === 'game' && Tracking.trackEvent('o_game');
  };

  const handleChange = (e) => {
    setCurrentIndex(e.detail.current);
  };

  return (
    <View className={styles['hero']}>
      <Swiper className={styles['hero__swiper']} vertical={false} onChange={handleChange} circular>
        {bannerList?.map((item, index) => (
          <SwiperItem
            className={cx([
              styles['hero__swiper__item'],
              {
                [styles['hero__swiper__item__active']]: currentIndex === index,
              },
            ])}
            key={item.id}
          >
            <View onClick={handleClick}>
              <Image src={`${BUCKET_URL}${item?.attributes?.url}`} mode='aspectFill'></Image>
            </View>
          </SwiperItem>
        ))}
      </Swiper>
    </View>
  );
});
