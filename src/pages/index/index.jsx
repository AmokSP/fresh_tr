import { useState, useEffect } from 'react';
import { View, Image } from '@tarojs/components';
import { useShareAppMessage, useShareTimeline } from '@tarojs/taro';
import { goto, showLoading, hideLoading } from '@utils';
import { useTranslation } from 'react-i18next';
import { Tracking } from '@utils/tracking';
import CustomNav from '@components/CustomNav';
import LogoImageWhite from '@assets/logo-white.png';
import LogoImageBlack from '@assets/logo-large.png';

import { HomeService } from '@api/home.services';
import useStore from '@stores';
import storage from '@utils/storage';

import styles from './index.module.scss';
import Hero from './components/Hero';
import HomeCard from './components/HomeCard';
import HomeStar from './components/HomeStar';
import HomeStory from './components/HomeStory';
import HomePopup from './components/HomePopup';
import LangSwitch from './components/LangSwitch';
import Plane from '@assets/plane.png';
import { HIDEAWAY } from '@app.config';

export default function Index() {
  // const { result: location } = useLocation();
  // const location = DEFAULT_LOCATION;

  const language = useStore((state) => state.language);
  const { t } = useTranslation();

  const [showNav, setShowNav] = useState(true);
  const [homeData, setHomeData] = useState(null);
  const [hideHomePopup, setHideHomePopup] = useState(storage.getItem('hideHomePopup'));

  useEffect(() => {
    _getHome();
  }, [language]);

  const _getHome = async () => {
    showLoading();
    const result = await HomeService.getHome();
    const _homeData = result?.data?.attributes;
    setHomeData(_homeData);
    hideLoading();
  };

  // usePageScroll((e) => {
  //   const { scrollTop } = e;
  //   if (scrollTop > 200 && !showNav) {
  //     setShowNav(true);
  //   }
  //   if (scrollTop < 200 && showNav) {
  //     setShowNav(false);
  //   }
  // });

  const handleClaim = () => {
    const link = homeData?.floatingIconLink;
    goto({ url: link });
    Tracking.trackEvent('h_icon');
  };
  const goToHideaway = () => {
    goto({ url: HIDEAWAY.INDEX });
  };

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
    <View className='page'>
      <CustomNav title='' show={showNav} showNav={false} collapsed backgroundColor='#e8f0f9'>
        <View className={styles['home__logo']}>
          {!showNav && <Image src={LogoImageWhite} mode='aspectFill'></Image>}
          {showNav && <Image src={LogoImageBlack} mode='aspectFill'></Image>}
        </View>
      </CustomNav>
      <View className={styles['home']}>
        <Image onClick={goToHideaway} src={Plane} className={styles['home__plane']}></Image>
        <View className={styles['home__block']}>
          <View className={styles['home__swiper']}>
            <Hero data={homeData?.banner?.data} />
            {ENABLE_LANG && <LangSwitch />}
          </View>
        </View>
        <View className={styles['home__spliter']}></View>
        {/* <View className={styles["home__block"]}>
          <View className={styles["home__weather"]}>
            <Weather location={location} />
          </View>
        </View> */}
        {/* <View className={styles["home__spliter"]}></View> */}
        <View className={styles['home__block']}>
          <View className={styles['home__block__title']}>{homeData?.shelfTitle}</View>
          <HomeStar data={homeData?.starProducts?.data} />
        </View>

        {homeData?.shelves.data.map((item, index) => {
          return (
            <View key={item.id}>
              <View className={styles['home__spliter']}></View>
              <View className={styles['home__block']}>
                <HomeCard data={item} index={index + 3} />
              </View>
            </View>
          );
        })}

        <View className={styles['home__spliter']}></View>
        <HomeStory data={homeData?.trademarkArticleImg?.data} />
        <View className={styles['home__button__float']} onClick={handleClaim}>
          {homeData && (
            <Image
              src={`${CMS_URL}${homeData?.floatingIcon?.data?.attributes?.url}`}
              mode='aspectFill'
            ></Image>
          )}
        </View>

        {/* <DestPopup /> */}

        {!hideHomePopup && homeData?.popupImg && (
          <HomePopup
            data={homeData}
            onClose={() => {
              setHideHomePopup(true);
            }}
          />
        )}
      </View>
    </View>
  );
}
