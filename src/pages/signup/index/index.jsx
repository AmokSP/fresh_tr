import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { View, Input, Text, Button, Image } from '@tarojs/components';
import Taro, { useRouter, useDidShow } from '@tarojs/taro';
import { Picker, DatePicker } from '@nutui/nutui-react-taro';
import { useTranslation } from 'react-i18next';
import storage from '@utils/storage';
import cx from 'classnames';
import { Tracking } from '@utils/tracking';
import { CommonService } from '@api/common.services';
import { TaskService } from '@api/task.services';
import { UserService } from '@api/user.services';
import { PointService } from '@api/point.services';
import { TASK } from '@constants';
import { goto, showToast, delayNavigateBack, showLoading, hideLoading } from '@utils';
import { HIDEAWAY, PAGES } from '@app.config';
import CustomNav from '@components/CustomNav';
import PrivacyAuth from '@components/PrivacyAuth';
import RegionPicker from '@components/RegionPicker';
import useStore from '@stores';

import LogoImage from '@assets/logo-large.png';
import LogoWhite from '@assets/logo-white.png';
import CnyArBG from '@assets/campaign/cnyar';
import ArgardenBG from '@assets/campaign/argarden';
import styles from './index.module.scss';
import Navbar, { NAVBAR_HEIGHT } from '@components/Basic/Navbar';
import Header from '@components/Basic/Header';
import { CouponService } from '@api/coupon.services';
import { LuckyService } from '@api/lucky.services';
import i18n from '@i18n';

const sexData = [
  {
    text: '先生',
    value: 'Mr.',
  },
  {
    text: '女士',
    value: 'Mrs.',
  },
];
const campaignBg = {
  cnyar: CnyArBG,
  argarden: ArgardenBG,
};

export default function Signup({
  inPage = false,
  ctaText = i18n.t('common.submitAndSignup'),
  onSuccess = () => {},
  onClose = () => {},
}) {
  const {
    isLogin,
    userInfo: { profile },
    utmSource,
    utmMedium,
    utmCampaign,
  } = useStore((state) => state);

  const [agreePolicy, setAgreePolicy] = useState(false);
  const [showSexPicker, setShowSexPicker] = useState(false);
  const [showDatePicker, setShowDataPicker] = useState(false);
  const [showRegionPicker, setShowRegionPicker] = useState(false);
  const [regionData, setRegionData] = useState([]);
  const [sex, setSex] = useState(sexData.find((item) => item.value === profile?.prefix) ?? null);
  const [city, setCity] = useState(profile?.city ?? '');
  const [name, setName] = useState(profile?.nickName ?? '');
  const [mobile, setMobile] = useState(profile?.mobile ?? '');
  const [birthday, setBirthday] = useState(profile?.birthday?.split('-') ?? []);

  const isRegister = profile?.status === 'Registered';
  const store = useStore();
  const router = useRouter();
  const { redirect } = router.params;
  const { t } = useTranslation();
  const isH5Campaign =
    redirect !== undefined && !['hideaway_poster', 'hideaway'].includes(redirect);
  useEffect(() => {
    if (isLogin) {
      _getRegion();
      _setDefault();
    }
  }, [isLogin, profile]);

  const _setDefault = () => {
    console.log('profile', profile);
    setMobile(profile?.mobile ?? '');
    setName(profile?.nickName ?? '');
    setCity(profile?.city ?? '');
    if (profile?.birthday) {
      setBirthday(profile?.birthday?.split('-') ?? []);
    }
    const prefix = sexData.find((item) => item.value === profile?.prefix);
    setSex(prefix ?? null);
  };
  const _getRegion = async () => {
    const result = await CommonService.getRegion();
    const _data = result.map((item) => {
      return {
        value: item.adcode,
        text: item.name,
        children: item.districts.map((_item) => ({
          value: _item.adcode,
          text: _item.name,
        })),
      };
    });
    setRegionData(_data);
  };

  const checkBoxClass = classNames([
    styles['policy__checkbox'],
    {
      [styles['policy__checkbox__active']]: agreePolicy,
    },
  ]);

  const handleCheckPolicy = () => {
    setAgreePolicy(!agreePolicy);
  };

  const handlePhoneNumber = async (e) => {
    const code = e?.detail?.code;
    if (code) {
      const result = await UserService.savePhoneNumber({ code });
      setMobile(result?.mobile);
    }
  };

  const handleSubmit = () => {
    if (name.trim() === '') {
      showToast({ title: t('signup.error.name') });
      return;
    }
    if (!sex?.value) {
      showToast({ title: t('signup.error.gender') });
      return;
    }
    if (mobile.trim() === '') {
      showToast({ title: t('signup.error.mobile') });
      return;
    }
    if (city.trim() === '') {
      showToast({ title: t('signup.error.country') });
      return;
    }
    if (!agreePolicy) {
      showToast({ title: t('signup.error.policy') });
      return;
    }
    submitData();
  };

  const submitData = async () => {
    if (isRegister) {
      try {
        const result = await UserService.editProfile({
          city,
          birthday: birthday?.join('-'),
          nickname: name,
          prefix: sex?.value,
        });
        store.setUserInfo({
          profile: result,
        });
        showToast({
          icon: 'success',
          title: '登记成功',
        });
        handleBack();
      } catch {
        showToast({
          title: '修改失败，请稍后再试',
        });
      }
      return;
    }
    await UserService.signup({
      city,
      birthday: birthday?.join('-'),
      nickname: name,
      prefix: sex?.value,
      utmSource,
      utmMedium,
      utmCampaign,
    });

    Tracking.trackEvent('register', {
      unionId: profile?.unionId,
    });

    showToast({
      icon: 'success',
      title: '登记成功',
    });
    const result = await UserService.getUserInfo();
    store.setUserInfo(result);
    PointService.fireTask({ name: TASK.Complete_Register });

    handleBack();
  };
  const handleBack = () => {
    onSuccess?.();
    if (inPage) {
      setTimeout(() => {
        onClose();
      }, 2000);
    } else if (redirect !== undefined) {
      switch (redirect) {
        case 'hideaway':
          setTimeout(() => {
            goto({ url: HIDEAWAY.INDEX, type: 'redirectTo' });
          }, 2000);
          break;
        case 'hideaway_poster':
          setTimeout(() => {
            goto({ url: HIDEAWAY.POSTER, type: 'redirectTo' });
          }, 2000);
          break;

        default:
          setTimeout(() => {
            goto({ url: `${PAGES.WEBVIEW}?target=${redirect}`, type: 'redirectTo' });
          }, 2000);
          break;
      }
    } else {
      delayNavigateBack();
    }
  };

  // const handleRedeemLogic = async () => {
  //   if (!giftName) return delayNavigateBack();
  //   Taro.showLoading();
  //   let data;
  //   switch (giftType) {
  //     case "draw":
  //       data = await LuckyService.drawPrize(giftName);
  //       break;
  //     case "coupon":
  //       data = await CouponService.bindCoupon({ name: giftName });
  //       break;
  //   }
  //   Taro.getApp().afterRegister = {
  //     target: data.couponId || giftName,
  //     type: giftType,
  //   };
  //   Taro.hideLoading();
  //   Taro.navigateBack();
  // };

  return (
    <View className='page'>
      <Navbar transparent holdPlace={false}>
        <Header
          buttonBack={inPage ? true : undefined}
          buttonHome={inPage ? false : true}
          onClickBack={inPage ? onClose : undefined}
          // title={t('page.title.signup')}
        ></Header>
      </Navbar>
      <View
        className={cx(styles['signup'], {
          [styles[redirect]]: isH5Campaign,
        })}
        style={
          isH5Campaign
            ? {
                paddingTop: NAVBAR_HEIGHT,
                backgroundImage: `url(${campaignBg[redirect]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : {
                paddingTop: NAVBAR_HEIGHT,
              }
        }
      >
        <View className={styles['signup__header']}>
          <View className={styles['signup__header__logo']}>
            <Image src={isH5Campaign ? LogoWhite : LogoImage} mode='aspectFill'></Image>
          </View>
          <View className={styles['signup__header__title']}>
            {isH5Campaign ? t(`signup.campaign.title.${redirect}`) : t('signup.title')}
          </View>
          {/* <View className={styles['signup__header__subtitle']}>{t('signup.subtitle')}</View> */}
        </View>

        <View className={styles['signup__form']}>
          <View className={styles['signup__form__item']}>
            <View className={styles['signup__form__item__input']}>
              <Input
                placeholder={`* ${t('common.name')}`}
                cursorSpacing={100}
                placeholderClass={styles['placeholder']}
                maxlength='20'
                onInput={(e) => {
                  setName(e.detail.value);
                }}
                value={name}
              />
            </View>
          </View>
          <View className={styles['signup__form__item']}>
            <View
              className={`${styles['signup__form__item__input']} ${styles['signup__form__item__picker']}`}
              onClick={() => {
                setShowSexPicker(true);
              }}
            >
              <Input
                placeholder={`* ${t('common.gender')}`}
                cursorSpacing={100}
                value={sex?.text}
                placeholderClass={styles['placeholder']}
                disabled
              />
              <Text className='iconfont icon-prev'></Text>
            </View>
          </View>
          <View className={styles['signup__form__item']}>
            <View className={styles['signup__form__item__input']}>
              <Input
                placeholder={`* ${t('common.mobile')}`}
                cursorSpacing={100}
                placeholderClass={styles['placeholder']}
                maxlength={15}
                value={mobile}
                disabled
                onInput={(e) => {
                  setMobile(e.detail.value);
                }}
              />
            </View>
            {!isRegister && (
              <Button
                className={styles['signup__form__item__button']}
                openType='getPhoneNumber'
                onGetPhoneNumber={handlePhoneNumber}
              >
                {t('common.wechatAuth')}
              </Button>
            )}
          </View>
          <View
            className={styles['signup__form__item']}
            onClick={() => {
              setShowRegionPicker(true);
            }}
          >
            <View
              className={`${styles['signup__form__item__input']} ${styles['signup__form__item__picker']}`}
            >
              <Input
                placeholder={`* ${t('common.countryAndArea')}`}
                cursorSpacing={100}
                disabled
                placeholderClass={styles['placeholder']}
                value={city}
              />
              <Text className='iconfont icon-prev'></Text>
            </View>
          </View>
          <View className={styles['signup__form__item']}>
            <View
              className={`${styles['signup__form__item__input']} ${styles['signup__form__item__picker']}`}
              onClick={() => {
                setShowDataPicker(true);
              }}
            >
              <Input
                placeholder={`${t('common.birthday')}`}
                cursorSpacing={100}
                placeholderClass={styles['placeholder']}
                value={birthday.join('-')}
                disabled
              />
              <Text className='iconfont icon-prev'></Text>
            </View>
          </View>
          <View className={styles.birthdayHint}>{t('signup.birthdayTip')}</View>
        </View>
        <View className={styles['policy_button']} onClick={handleSubmit}>
          {ctaText}
        </View>
        <View className={styles['policy']} onClick={handleCheckPolicy}>
          <View className={checkBoxClass}>
            <Text className={`${styles['policy__checkbox__icon']} iconfont icon-right`}></Text>
          </View>
          <View className={styles['policy__text']}>
            {t('signup.policy.part1')}
            <Text
              className='text_link'
              onClick={(e) => {
                e.stopPropagation();
                goto({ url: `${PAGES.POLICY}?name=private` });
              }}
            >
              {t('signup.policy.link')}
            </Text>
            {t('signup.policy.part2')}
            <Text
              className='text_link'
              onClick={(e) => {
                e.stopPropagation();
                goto({ url: `${PAGES.POLICY}?name=private` });
              }}
            >
              {t('signup.policy.link')}
            </Text>
            {t('signup.policy.part3')}
          </View>
        </View>
        {/* <View
          className={styles["policy_button__cancel"]}
          onClick={() => {
            const pages = Taro.getCurrentPages();
            if (pages.length > 1) {
              Taro.navigateBack();
            } else {
              goto({
                url: PAGES.INDEX,
              });
            }
          }}
        >
          {t("common.cancelSignup")}
        </View> */}
      </View>
      <Picker
        options={sexData}
        visible={showSexPicker}
        onConfirm={(options) => {
          setSex(options[0]);
        }}
        onClose={() => {
          setShowSexPicker(false);
        }}
      />
      <DatePicker
        title={t('common.pickBirthDay')}
        startDate={new Date(1940, 0, 1)}
        endDate={new Date(2030, 0, 1)}
        defaultValue={new Date(1990, 0, 1)}
        visible={showDatePicker}
        showChinese
        onClose={() => setShowDataPicker(false)}
        onConfirm={(options, values) => {
          setBirthday(values);
        }}
      />
      <RegionPicker
        showRegion={showRegionPicker}
        regionData={regionData}
        onClose={() => {
          setShowRegionPicker(false);
        }}
        onChange={(options) => {
          setCity(options.text);
        }}
      />
      <PrivacyAuth init />
    </View>
  );
}
