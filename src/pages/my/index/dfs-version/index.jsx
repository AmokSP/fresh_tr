import { useState, useMemo, useEffect } from 'react';
import { View, Text, Button, Image } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import { useTranslation } from 'react-i18next';
import useStore from '@stores';
import storage from '@utils/storage';
import PrivacyAuth from '@components/PrivacyAuth';
import LogoImage from '@assets/logo-large.png';
import IconCoupon from '@assets/icons/dfs/coupon.svg';
import IconAddress from '@assets/icons/dfs/address.svg';
import IconPolicy from '@assets/icons/dfs/policy.svg';
import IconTerms from '@assets/icons/dfs/terms.svg';
import IconArrowRight from '@assets/icons/arrow-right.svg';
import IconGift from '@assets/icons/dfs/gift.svg';
import { goto } from '@utils';
import { PAGES } from '@app.config';

import { UserService } from '@api/user.services';

import styles from './index.module.scss';
import PopupRule from '../components/PopupRule';
import GiftList from '../components/GiftList';
import Footer from '../components/Footer';
import Navbar from '@components/Basic/Navbar';
import Header from '@components/Basic/Header';
import useAsync from '@hooks/useAsync';
import { HomeService } from '@api/home.services';

export default function Index() {
  const [initPrivacy, setInitPrivacy] = useState(false);
  const [showRule, setShowRule] = useState(false);
  const { value: myPageCards, execute: fetchMyPageCards } = useAsync(async () => {
    const { data } = await HomeService.getMyPageCards();
    return data?.attributes?.cards;
  });
  const userInfo = useStore((state) => state.userInfo);
  const isSignup = userInfo?.profile?.status === 'Registered';
  const store = useStore();
  const { t } = useTranslation();

  const _getUserInfo = async () => {
    const result = await UserService.getUserInfo();
    store.setUserInfo(result);
  };

  const hasNewGift = useMemo(() => {
    const currentGiftCount = storage.getItem('giftCount') ?? 0;
    const giftCount = userInfo?.giftCount ?? 0;
    if (giftCount > 0 && giftCount !== currentGiftCount) {
      return true;
    }
    return false;
  }, [userInfo]);

  const handleAgreePrivacyAuthorization = () => {
    setInitPrivacy(true);
    Taro.chooseAddress();
  };
  useEffect(() => {
    fetchMyPageCards();
  }, []);

  useDidShow(() => {
    _getUserInfo();
  });
  return (
    <View className={`${styles.my}`}>
      <Navbar transparent={'auto'} holdPlace>
        <Header buttonBack={false} title={t('page.title.myCoupon')}></Header>
      </Navbar>
      <>
        <Image className={styles.logo} src={LogoImage}></Image>
        <View className={styles.board}>
          <View
            className={styles['my__coupon']}
            onClick={() => {
              goto({ url: PAGES.MY_COUPON });
            }}
          >
            <Image src={IconCoupon} />
            <View>{t('common.myCoupon')}&gt;</View>
          </View>
          <View
            className={styles['my__gifts']}
            onClick={() => {
              storage.setItem('giftCount', userInfo?.giftCount ?? 0);
              goto({ url: PAGES.MY_GIFT });
            }}
          >
            {!isSignup ? (
              <Image src={IconGift} mode='aspectFill' />
            ) : (
              <View className={styles['my__value']}>
                {userInfo?.giftCount ?? 0}
                {hasNewGift && <View className={styles['my__value__tip']}></View>}
              </View>
            )}
            <View>{t('common.myGifts')}&gt;</View>
          </View>
        </View>
        <View className={styles.navigators}>
          <View className={styles.navItem} onClick={handleAgreePrivacyAuthorization}>
            <Image className={styles.icon} src={IconAddress} />
            {t('common.myAddress')}
            <Image className={styles.arrow} src={IconArrowRight} />
          </View>
          <View
            className={styles.navItem}
            onClick={() => {
              goto({ url: `${PAGES.POLICY_STORE}` });
            }}
          >
            <Image className={styles.icon} src={IconPolicy} />
            {t('common.storePolicy')}
            <Image className={styles.arrow} src={IconArrowRight} />
          </View>
          <View
            className={styles.navItem}
            onClick={() => {
              goto({ url: `${PAGES.POLICY}?name=termsAndConditions` });
            }}
          >
            <Image className={styles.icon} src={IconTerms} />
            {t('common.termsAndPolicy')}
            <Image className={styles.arrow} src={IconArrowRight} />
          </View>
        </View>
        <View className={styles.cards}>
          {myPageCards?.map((card) => (
            <View
              className={styles.card}
              onClick={() => {
                card.link && goto({ url: card.link });
              }}
              style={{
                backgroundImage: `url(${CMS_API_URL}${card.backgroundImg?.data?.attributes?.url})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
            >
              {card.title && <View className={styles.cardTitle}>{card.title}</View>}
              {card.description && <View className={styles.cardCTA}>{card.description}</View>}
            </View>
          ))}
        </View>
      </>
      {showRule && (
        <PopupRule
          onClose={() => {
            setShowRule(false);
          }}
        />
      )}
      <PrivacyAuth init={initPrivacy} />
    </View>
  );
}
