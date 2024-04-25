import React, { useEffect, useState } from 'react';
import { View, Image, Swiper, SwiperItem, Navigator } from '@tarojs/components';
import Masonry from 'react-masonry-css';
import cx from 'classnames';
import { PAGES } from '@app.config';
import { Tracking } from '@utils/tracking';
import styles from './index.module.scss';

export default React.memo(({ brandNewsData = [] }: any) => {
  const [headerNews, setHeaderNews] = useState<any[]>([]);
  const [bodyNews, setBodyNews] = useState<any[]>([]);

  useEffect(() => {
    setHeaderNews(brandNewsData.slice(0, 2));
    setBodyNews(brandNewsData.slice(2));
  }, [brandNewsData]);

  return (
    <View className={styles['brand-news']}>
      <View className={styles['brand-news__header']}>
        <Swiper
          className={styles['brand-news__header__swiper']}
          vertical={false}
          displayMultipleItems={1}
          nextMargin='84px'
        >
          {headerNews?.map((item, index) => (
            <Navigator
              className='list-item'
              hoverClass='none'
              key={index}
              url={`${PAGES.NEWS_DETAIL}?id=${item?.id}`}
            >
              <SwiperItem
                className={styles['brand-news__header__swiper__item']}
                key={item.id}
                onClick={() => {
                  Tracking.trackEvent('n_news', {
                    button_id: item?.attributes?.title,
                  });
                }}
              >
                <Image
                  src={`${BUCKET_URL}${item?.attributes?.headerImg?.data?.attributes?.url}`}
                  className={styles['brand-news__header__swiper__item__image']}
                  mode='aspectFill'
                ></Image>
                <View className={styles['brand-news__header__swiper__item__title']}>
                  <View className={styles['brand-news__header__swiper__item__title__wrap']}>
                    {item?.attributes?.title}
                  </View>
                </View>
                <View className={styles['brand-news__header__swiper__item__sub']}>
                  {item?.attributes?.subTitle}
                </View>
              </SwiperItem>
            </Navigator>
          ))}
        </Swiper>
      </View>
      <View className={styles['brand-news__body']}>
        <Masonry
          breakpointCols={2}
          className='my-masonry-grid'
          columnClassName='my-masonry-grid_column'
        >
          {bodyNews?.map((item, index) => {
            return (
              <Navigator
                className='list-item'
                hoverClass='none'
                key={index}
                url={`${PAGES.NEWS_DETAIL}?id=${item?.id}`}
              >
                <View
                  className={cx(styles['brand-news__body__item'], 'my-masonry-grid_column_item')}
                  key={item.id}
                  onClick={() => {
                    Tracking.trackEvent('n_news', {
                      button_id: item?.attributes?.title,
                    });
                  }}
                >
                  <Image
                    src={`${BUCKET_URL}${item?.attributes?.headerImg?.data?.attributes?.url}`}
                    className={styles['brand-news__body__item__image']}
                    mode='widthFix'
                  ></Image>
                  <View className={styles['brand-news__body__item__title']}>
                    {item?.attributes?.title}
                  </View>
                  <View className={styles['brand-news__body__item__sub']}>
                    {item?.attributes?.subTitle}
                  </View>
                </View>
              </Navigator>
            );
          })}
        </Masonry>
      </View>
    </View>
  );
});
