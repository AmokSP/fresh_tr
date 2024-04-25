import { View } from '@tarojs/components';
import React, { useEffect } from 'react';
import { useRouter, useShareAppMessage, useShareTimeline } from '@tarojs/taro';
import NewsService from '@api/news.services';
import { useTranslation } from 'react-i18next';
import useStore from '@stores';
import CustomNav from '@components/CustomNav';
import Hero from './components/Hero';
import Tabs from './components/Tabs';
import BrandNews from './components/BrandNews';
import QAndA from './components/QAndA';
import KolNews from './components/KolNews';
import styles from './index.module.scss';

export default React.memo(() => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = React.useState<number>(
    Number(router?.params?.id) - 1 || 2
  );
  const [banners, setBanners] = React.useState<any>(null);
  const [qAndA, setQandA] = React.useState<any[]>([]);
  const [articles, setArticles] = React.useState<any[]>([]);
  const [kolArticles, setKolArticles] = React.useState<any[]>([]);
  const language = useStore((state) => state.language);
  const { t } = useTranslation();

  const tabsData = [
    {
      id: 1,
      label: t('news.tabs.brand'),
      visible: true,
    },
    {
      id: 2,
      label: t('news.tabs.shopping'),
      visible: true,
    },
    {
      id: 3,
      label: t('news.tabs.kol'),
      visible: true,
    },
  ];

  const handleTabChange = (index: number) => {
    setCurrentIndex(index);
  };

  const fetchNewsInfos = async () => {
    const { data } = await NewsService.getNewsInfos();
    setBanners(data?.attributes);
    setQandA(data?.attributes?.q_and_a?.data);
    setArticles(data?.attributes?.articles?.data);
    setKolArticles(data?.attributes?.recommends?.data);
  };

  useEffect(() => {
    fetchNewsInfos();
  }, [language]);

  useShareAppMessage(() => {
    return {
      title: t('common.shareTitle'),
      imageUrl: `${SHARE_IMAGE}?${+new Date()}`,
    };
  });

  useShareTimeline(() => {
    return {
      title: t('common.shareTitle'),
    };
  });

  return (
    <View
      style={{
        width: '100vw',
        height: '100%',
        paddingBottom: '50px',
        backgroundColor: currentIndex === 2 ? '#EFF3F6' : 'white',
      }}
    >
      <CustomNav title={t('page.title.news')} showNav={false} />
      <View className={styles['news']}>
        <View className={styles['news__swiper']}>
          <Hero data={banners} />
        </View>
        <View className={styles['news__tabs']}>
          <Tabs tabsList={tabsData} onChange={handleTabChange} currentIndex={currentIndex} />
        </View>
        <View className={styles['news__list']}>
          {currentIndex === 0 && <BrandNews brandNewsData={articles} />}
          {currentIndex === 1 && <QAndA data={qAndA} />}
          {currentIndex === 2 && <KolNews newsData={kolArticles} />}
        </View>
      </View>
    </View>
  );
});
