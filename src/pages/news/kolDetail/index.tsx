import React, { useCallback, useEffect, useState } from 'react';
import Taro, { useRouter, useShareAppMessage } from '@tarojs/taro';
import { Image, Swiper, SwiperItem, View, Video } from '@tarojs/components';
import cx from 'classnames';
import CustomNavbar from '@components/Basic/Navbar';
import { completePointTask } from '@utils/methods';
import NewsService from '@api/news.services';
import styles from './index.module.scss';
import Header from '@components/Basic/Header';
import CustomRichText from '@components/CustomRichText';
import { TASK } from '@constants/index';

export default React.memo(() => {
  const router = useRouter();
  const [article, setArticle] = useState<any>();
  const [banners, setBanners] = useState<any[]>();

  const _pageOptions = {
    navbar: {},
    header: {
      buttonBack: true,
      buttonHome: true,
      title: '',
    },
  };

  const fetchArticleById = async () => {
    const { data } = await NewsService.getKolArticleById(router?.params?.id);

    const articleData = data && data[0]?.attributes;
    let bannerData = articleData?.rotateImgs?.data || [];
    if (articleData.videoUrl) {
      bannerData.unshift({
        id: -1,
        type: 'video',
        url: articleData.videoUrl,
      });
    }
    setArticle(articleData);
    setBanners(bannerData);
  };

  useEffect(() => {
    fetchArticleById();
  }, []);

  useShareAppMessage(() => {
    completePointTask(TASK.SHARE_ARTICLE, 'kol' + article?.name?.trim());
    return { title: article?.title, imageUrl: SHARE_IMAGE };
  });

  return (
    <View className='page'>
      <CustomNavbar {..._pageOptions.navbar}>
        <Header {..._pageOptions.header}>
          <View className={styles['header__info']}>
            <View className={styles['header__info__avatar']}>
              <Image
                src={`${BUCKET_URL}${article?.authorIcon?.data?.attributes?.url}`}
                mode='aspectFill'
              ></Image>
            </View>
            <View className={styles['header__info__author']}>{article?.author}</View>
          </View>
        </Header>
      </CustomNavbar>
      <View className={styles['kol-detail']}>
        <View className={styles['kol-detail__header']}>
          <PDPSwiper banners={banners}></PDPSwiper>
        </View>
        <View className={styles['kol-detail__body']}>
          <View className={styles['kol-detail__body__title']}>{article?.title}</View>
          {/* <RichContent content={filterRichText(article?.content)} /> */}
          <CustomRichText content={article?.content} />
        </View>
        <View className={styles['kol-detail__footer']}>
          <View className={styles['kol-detail__footer__author__date']}>{article?.publishDate}</View>
          {/* <Image
            src={`${BUCKET_URL}${article?.authorIcon?.data?.attributes?.url}`}
          />
          <View className={styles["kol-detail__footer__author"]}>
            {article?.author}
            <View className={styles["kol-detail__footer__author__date"]}>
              {article?.publishDate}
            </View>
          </View> */}
        </View>
      </View>
    </View>
  );
});

const PDPSwiper = React.memo(({ banners = [] }: { banners?: any }) => {
  if (!banners) return <View></View>;
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [imageHeight, setImageHeight] = useState(500);

  const slideChange = useCallback((e) => {
    setCurrent(e.detail.current);
  }, []);

  const handleImageLoad = (e, index) => {
    if (!loaded && index == 0) {
      const { height, width } = e.detail;
      const ratio = width / height;
      const info = Taro.getSystemInfoSync();
      setImageHeight(info.screenWidth / ratio);
      setLoaded(true);
    }
  };

  return (
    <View className={styles['pdp-swiper-wrapper']}>
      {/* {banners?.length === 1 && (
        <View
          className={styles["custom-swiper"]}
          style={{ height: `${imageHeight}px` }}
        >
          <View className={styles["custom-swiper-item"]}>
            <Image
              lazyLoad
              className={styles["custom-swiper-image"]}
              src={`${BUCKET_URL}${banners[0]?.attributes?.url}`}
              mode="aspectFit"
              onLoad={handleImageLoad}
            />
          </View>
        </View>
      )} */}

      <Swiper
        autoplay={false}
        className={styles['custom-swiper']}
        current={current}
        onChange={slideChange}
        style={{ height: `${imageHeight}px` }}
      >
        {banners?.map((item, idx) => {
          return (
            <SwiperItem className={styles['custom-swiper-item']} key={idx + 1}>
              {item.type === 'video' && (
                <Video
                  src={item?.url}
                  loop
                  objectFit='cover'
                  autoplay
                  className='head-video'
                  controls={false}
                  style='width:100%;height:100%;'
                ></Video>
              )}
              {!item?.type && (
                <Image
                  className={styles['custom-swiper-image']}
                  src={`${BUCKET_URL}${item?.attributes?.url}`}
                  mode='heightFix'
                  onLoad={(e) => {
                    handleImageLoad(e, idx);
                  }}
                />
              )}
            </SwiperItem>
          );
        })}
      </Swiper>

      <View>
        {banners?.length > 1 && (
          <View className={styles['indicator-dots']}>
            {new Array(banners?.length).fill(1).map((_, index) => (
              <View
                className={cx(styles['dot'], {
                  [styles['active']]: index === current,
                })}
              ></View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
});
