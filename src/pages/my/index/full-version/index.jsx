import { useState, useMemo } from 'react';
import { View, Text, Button, Image } from '@tarojs/components';
import { useDidShow } from '@tarojs/taro';
import { useTranslation } from 'react-i18next';
import useStore from '@stores';
import storage from '@utils/storage';
import CustomNav from '@components/CustomNav';
import PrivacyAuth from '@components/PrivacyAuth';
import LogoImage from '@assets/logo-square.png';
import EditIcon from '@assets/icons/pencil.svg';
import { goto } from '@utils';
import { PAGES } from '@app.config';

import { UserService } from '@api/user.services';

import styles from './index.module.scss';
import PopupRule from '../components/PopupRule';
import GiftList from '../components/GiftList';
import Footer from '../components/Footer';

const defaultAvatar = storage.getItem('avatar') || LogoImage;

export default function Index() {
  const [initPrivacy, setInitPrivacy] = useState(false);
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [showRule, setShowRule] = useState(false);
  const userInfo = useStore((state) => state.userInfo);

  const store = useStore();
  const { t } = useTranslation();

  const isSignup = userInfo?.profile?.status === 'Registered';

  const handleAvatar = async (e) => {
    setInitPrivacy(true);
    const { avatarUrl } = e.detail;
    if (avatarUrl) {
      setAvatar(avatarUrl);
      store.setAvatar(avatarUrl);
      console.log('avatarUrl', avatarUrl);
      await UserService.saveAvatar({ filePath: avatarUrl });
    }
  };

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

  useDidShow(() => {
    console.log('use did show');
    _getUserInfo();
  });

  return (
    <View className='page'>
      <CustomNav title={t('page.title.my')} showNav={false} />
      <View className={styles['my']}>
        <View className={styles['my__main']}>
          <View className={styles['my__profile']}>
            <View className={styles['my__profile__avatar']}>
              <Image src={avatar} mode='aspectFill'></Image>
              <Button
                openType='chooseAvatar'
                onChooseAvatar={handleAvatar}
                onClick={handleAvatar}
              ></Button>
              <View className={styles['my__profile__avatar__edit']}>
                <Image src={EditIcon} mode='aspectFit'></Image>
              </View>
            </View>
            <View className={styles['my__profile__info']}>
              <View className={styles['my__profile__info__text']}>
                {userInfo?.profile?.nickName || '馥蕾诗亚太免税'}
                {/* {t("common.welcome")}！ */}
              </View>
              {isSignup && (
                <View
                  className={styles['my__profile__info__edit']}
                  onClick={() => {
                    goto({ url: PAGES.EDIT_PROFILE });
                  }}
                >
                  {t('common.editPeronalInfo')} &gt;
                </View>
              )}
              {!isSignup && (
                <View
                  className={styles['my__profile__info__signup']}
                  onClick={() => {
                    goto({ url: PAGES.SIGNUP });
                  }}
                >
                  {t('common.signupAndLogin')}
                </View>
              )}
            </View>
          </View>

          <View className={styles['my__board__1']}>
            <View
              className={styles['my__points']}
              onClick={() => {
                goto({ url: PAGES.MY_POINT });
              }}
            >
              <View className={styles['my__value']}>{userInfo?.summaryPoints ?? 0}</View>
              <View>{t('common.myPoints')} &gt;</View>
            </View>
            <View
              className={styles['my__gifts']}
              onClick={() => {
                storage.setItem('giftCount', userInfo?.giftCount ?? 0);
                goto({ url: PAGES.MY_GIFT });
              }}
            >
              <View className={styles['my__value']}>
                {userInfo?.giftCount ?? 0}
                {hasNewGift && <View className={styles['my__value__tip']}></View>}
              </View>
              <View>{t('common.myGifts')} &gt;</View>
            </View>
          </View>

          <View className={styles['my__board__2']}>
            <View
              className={styles['my__coupon']}
              onClick={() => {
                goto({ url: PAGES.MY_COUPON });
              }}
            >
              <View>
                <Text className='iconfont icon-coupon'></Text>
              </View>
              <View>{t('common.myCoupon')}</View>
            </View>
            <View
              className={styles['my__wishlist']}
              onClick={() => {
                goto({ url: PAGES.MY_WISH });
              }}
            >
              <View>
                <Text className='iconfont icon-heart'></Text>
              </View>
              <View>{t('common.myWish')}</View>
            </View>
          </View>

          <View className={styles['my__giftList']}>
            <GiftList
              onRule={() => {
                setShowRule(true);
              }}
            />
          </View>
        </View>
        <View className={styles['my__footer']}>
          <Footer />
        </View>
      </View>
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
