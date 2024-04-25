import { useEffect, useState } from 'react';
import { View, Swiper, SwiperItem, Image } from '@tarojs/components';
import { useTranslation } from 'react-i18next';
import { PAGES } from '@app.config';
import { goto } from '@utils';
import { Tracking } from '@utils/tracking';
import classNames from 'classnames';
import styles from './index.module.scss';

export default function HomeStar({ data = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeItem, setActiveItem] = useState(null);
  const { t } = useTranslation();

  const handleChange = (e) => {
    const { current } = e.detail;
    setCurrentIndex(current);
    setActiveItem(data[current]);
  };

  useEffect(() => {
    if (data.length > 0) {
      setActiveItem(data[0]);
    }
  }, [data]);

  const handleClick = () => {
    const product = activeItem?.attributes?.relProduct?.data;
    let { link } = activeItem?.attributes;
    if (product) {
      const sku = product?.id;
      link = `${PAGES.PRODUCT}?id=${sku}`;
    }
    if (link) {
      goto({ url: link });
    }
  };

  return (
    <View className={styles['productStar']}>
      <View className={styles['productStar__rank']}>{activeItem?.attributes?.title}</View>
      <View className={styles['productStar__title']}>{activeItem?.attributes?.subTitle}</View>
      <Swiper
        className={styles['productStar__swiper']}
        vertical={false}
        circular
        onChange={handleChange}
        previousMargin='50px'
        nextMargin='50px'
      >
        {data.map((item, index) => {
          const itemClass = classNames([
            styles['productStar__swiper__item'],
            {
              [styles['productStar__swiper__item__active']]: index === currentIndex,
            },
          ]);
          const imageURL = item?.attributes?.image?.data?.attributes?.url;
          return (
            <SwiperItem className={itemClass} key={item.id}>
              <View
                className={styles['productStar__swiper__item__image']}
                onClick={() => {
                  handleClick();
                  Tracking.trackEvent('h_star', {
                    button_id: item?.attributes?.subTitle,
                  });
                }}
              >
                {imageURL && <Image src={`${CMS_URL}${imageURL}`} mode='widthFix'></Image>}
              </View>
            </SwiperItem>
          );
        })}
      </Swiper>
      <View className={styles['productStar__swiper__indicator']}>
        <View className={styles['productStar__swiper__indicator__wrap']}>
          {data.map((item, index) => {
            const itemClass = classNames([
              styles['productStar__swiper__indicator__item'],
              {
                [styles['productStar__swiper__indicator__item__active']]: index === currentIndex,
              },
            ]);
            return <View className={itemClass} key={index}></View>;
          })}
        </View>
      </View>
      <View className={styles['productStar__subtitle']}>{activeItem?.attributes?.subTitle2}</View>
      <View
        className={`${styles['productStar__button__buy']} button`}
        onClick={() => {
          handleClick();
          Tracking.trackEvent('h_star', {
            button_id: activeItem?.attributes?.subTitle,
          });
        }}
      >
        {t('common.instantBuy')}
      </View>
    </View>
  );
}
