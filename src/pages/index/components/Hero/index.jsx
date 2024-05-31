import { useRef, useState } from 'react';
import { View, Swiper, SwiperItem, RichText, Video, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { TASK } from '@constants/index';
import { PointService } from '@api/point.services';
import { goto } from '@utils';
import { Tracking } from '@utils/tracking';
import classNames from 'classnames';
import styles from './index.module.scss';

const LAYOUT = {
  'top-bottom': 1,
  'all-bottom': 2,
  'all-top': 3,
  'title-top': 4,
  'title-bottom': 5,
};

export default function Hero({ data = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isFullScreen = useRef(false);

  const handleChange = (e) => {
    const { current } = e.detail;
    setCurrentIndex(current);
    pauseVideo();
    playVideo(current);
  };

  const playVideo = (index) => {
    const query = Taro.createSelectorQuery();
    query.select(`#video${index}`)?.context();
    query.exec((res) => {
      if (res.length > 0) {
        if (res[0]?.context) {
          res[0].context.seek(0);
          res[0].context.play();
        }
      }
    });
  };

  const pauseVideo = () => {
    const query = Taro.createSelectorQuery();
    query.selectAll('.head-video').context();
    query.exec((res) => {
      res[0].forEach((_res) => {
        _res.context.stop();
      });
    });
  };

  const slideTransform = `transform: translateX(${currentIndex * 100}%)`;
  const slideStyle = `width:${101 / data.length}%;${slideTransform}`;

  const handleClick = () => {
    const item = data[currentIndex];
    const { link, task } = item?.attributes;
    if (link) {
      goto({ url: link });
      task === 'live' && PointService.fireTask({ name: TASK.Subscribe_LS });
      task === 'game' && PointService.fireTask({ name: TASK.Play_GAME });
    }
    task === 'live' && Tracking.trackEvent('n_webinar');
    task === 'game' && Tracking.trackEvent('o_game');
  };

  return (
    <View className={styles['hero']}>
      <Swiper className={styles['hero__swiper']} vertical={false} onChange={handleChange}>
        {data.map((item, index) => {
          const titleLayout = item?.attributes?.titleLayout || 'top-bottom';
          const layout = LAYOUT[titleLayout];

          const titleClass = classNames([
            styles['hero__swiper__item__text__title'],
            styles[`layout${layout}__title`],
            {
              ['slideDown']: index === currentIndex,
            },
          ]);
          const subTitleClass = classNames([
            styles['hero__swiper__item__text__subtitle'],
            {
              ['slideUp']: index === currentIndex,
            },
          ]);

          const buttonClass = classNames([
            styles['hero__navigation__button'],
            styles[`layout${layout}__button`],
            {
              ['slideUp']: index === currentIndex,
            },
          ]);

          const buttonStyle = {
            backgroundColor: item?.attributes?.transparent
              ? 'transparent'
              : item?.attributes?.backgroundColor || '#000',
            borderColor: item?.attributes?.borderColor || '#424a52',
            color: item?.attributes?.textColor || '#424a52',
          };

          const titleStyle = {
            color: item?.attributes?.titleColor ? item?.attributes?.titleColor : '#000',
          };

          return (
            <SwiperItem className={styles['hero__swiper__item']} key={item.id}>
              <View className={styles['hero__swiper__item__text']} style={titleStyle}>
                <View className={titleClass}>
                  <RichText nodes={item?.attributes?.title}></RichText>
                </View>
                <View className={subTitleClass}>
                  <RichText nodes={item?.attributes?.subTitle}></RichText>
                </View>
                {item?.attributes?.buttonText && (
                  <View
                    className={buttonClass}
                    onClick={() => {
                      Tracking.trackEvent('h_banner', {
                        button_id: item?.attributes?.name,
                      });
                      handleClick();
                    }}
                    style={buttonStyle}
                  >
                    {item?.attributes?.buttonText}
                  </View>
                )}
              </View>
              {item?.attributes?.videoUrl && (
                <View className={styles['hero__swiper__item__video']}>
                  <Video
                    src={item?.attributes?.videoUrl}
                    autoplay={index === 0}
                    loop={item?.attributes?.autoRotation ?? true}
                    muted
                    objectFit='cover'
                    controls={false}
                    className='head-video'
                    id={`video${index}`}
                    onClick={() => {
                      Tracking.trackEvent('h_banner', {
                        button_id: item?.attributes?.name,
                      });
                      handleClick();
                    }}
                  ></Video>
                </View>
              )}
              {!item?.attributes?.videoUrl && (
                <View className={styles['hero__swiper__item__image']}>
                  <Image
                    src={`${CMS_URL}${item?.attributes?.image?.data?.attributes?.url}`}
                    mode='aspectFill'
                    onClick={() => {
                      Tracking.trackEvent('h_banner', {
                        button_id: item?.attributes?.name,
                      });
                      handleClick();
                    }}
                  ></Image>
                </View>
              )}
            </SwiperItem>
          );
        })}
      </Swiper>
      <View className={styles['hero__navigation']}>
        <View className={styles['hero__navigation__bg']}>
          <View className={styles['hero__navigation__slide']} style={slideStyle}></View>
        </View>
      </View>
    </View>
  );
}
