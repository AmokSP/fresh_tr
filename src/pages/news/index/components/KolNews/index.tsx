import React, { useEffect, useState } from 'react';
import { View, Image, Navigator } from '@tarojs/components';
import Masonry from 'react-masonry-css';
import cx from 'classnames';

import { PAGES } from '@app.config';
import styles from './index.module.scss';
import { Tracking } from '@utils/tracking';

export default React.memo(({ newsData = [] }: any) => {
  const [bodyNews, setBodyNews] = useState<any[]>([]);

  useEffect(() => {
    setBodyNews(newsData);
  }, [newsData]);

  return (
    <View className={styles['kol-news']}>
      <View className={styles['kol-news__body']}>
        <Masonry
          breakpointCols={2}
          className='xiaohongshu-masonry-grid'
          columnClassName='xiaohongshu-masonry-grid_column'
        >
          {bodyNews?.map((item, index) => {
            return (
              <Navigator
                className='list-item'
                hoverClass='none'
                key={index}
                url={`${PAGES.NEWS_KOL_DETAIL}?id=${item?.id}`}
              >
                <View
                  className={cx(
                    styles['kol-news__body__item'],
                    'xiaohongshu-masonry-grid_column_item'
                  )}
                  key={item.id}
                  onClick={() => {
                    Tracking.trackEvent('n_kol', {
                      button_id: item?.attributes?.title,
                    });
                  }}
                >
                  <Image
                    src={`${BUCKET_URL}${item?.attributes?.headerImg?.data?.attributes?.url}`}
                    className={styles['kol-news__body__item__image']}
                    mode='widthFix'
                  />
                  <View className={styles['kol-news__body__item__title']}>
                    {item?.attributes?.title}
                  </View>
                  <View className={styles['kol-news__body__item__footer']}>
                    <Image
                      src={`${BUCKET_URL}${item?.attributes?.authorIcon?.data?.attributes?.url}`}
                    />
                    <View className={styles['kol-news__body__item__footer__author']}>
                      {item?.attributes?.author}
                      <View className={styles['kol-news__body__item__footer__author__date']}>
                        {item?.attributes?.publishDate}
                      </View>
                    </View>
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
