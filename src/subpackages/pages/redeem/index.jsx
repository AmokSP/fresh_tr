import { useState } from 'react';
import { View, Text, Input } from '@tarojs/components';
import { useRouter } from '@tarojs/taro';
import CustomNav from '@components/CustomNav';
import LogoImage from '@assets/logo-large.png';
import ProductImage from '@assets/redeem/product.png';
import { useTranslation } from 'react-i18next';

import { CouponService } from '@api/coupon.services';

import styles from './index.module.scss';
import ErrorPanel from './components/ErrorPanel';
import SuccessPanel from './components/SuccessPanel';

export default function Exclaim() {
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessPanel, setShowSuccessPanel] = useState(false);
  const [showErrorPanel, setShowErrorPanel] = useState(false);
  const [showError, setShowError] = useState(false);
  const [password, setPassword] = useState('');
  const [couponData, setCouponData] = useState(null);

  const { t } = useTranslation();
  const router = useRouter();
  const { params } = router;
  const scene = params?.scene || '';

  const handleSubmit = async () => {
    const result = await CouponService.redeemCoupon({ password, scene });
    if (!result?.success) {
      /// setShowErrorPanel(true);
      setShowError(true);
    } else {
      setShowError(false);
      setCouponData(result.coupon);
      setShowSuccessPanel(true);
    }
  };

  const handleInput = (e) => {
    const { detail } = e;
    setPassword(detail.value);
  };

  return (
    <View className='page'>
      <CustomNav title={t('page.title.redeem')} />
      <View className={styles['redeem']}>
        <View className={styles['redeem__bg']}></View>
        <View className={styles['redeem__content']}>
          <View className={styles['redeem__logo']}>
            <image src={LogoImage} mode='widthFix'></image>
          </View>
          <View className={styles['redeem__product']}>
            <image src={ProductImage} mode='widthFix'></image>
          </View>
          <View className={styles['redeem__form']}>
            <View className={styles['redeem__form__input']}>
              <View className={styles['redeem__form__icon__lock']}>
                <Text className='iconfont icon-lock'></Text>
              </View>
              <View className={styles['redeem__form__input__element']}>
                <Input
                  placeholder={t('common.redeemPlaceHolder')}
                  value={password}
                  cursorSpacing={100}
                  onInput={handleInput}
                  password={!showPassword}
                ></Input>
              </View>
              <View
                className={styles['redeem__form__icon__eye']}
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                <Text className='iconfont icon-eye'></Text>
              </View>
            </View>
            {showError && (
              <View className={styles['redeem__form__errors']}>{t('common.redeemError')}</View>
            )}
            <View className={styles['redeem__form__button']} onClick={handleSubmit}>
              {t('common.confirm')}
            </View>
          </View>
        </View>
      </View>
      {showSuccessPanel && (
        <SuccessPanel
          couponData={couponData}
          onClose={() => {
            setShowSuccessPanel(false);
          }}
        />
      )}
      {showErrorPanel && (
        <ErrorPanel
          onClose={() => {
            setShowErrorPanel(false);
          }}
        />
      )}
    </View>
  );
}
