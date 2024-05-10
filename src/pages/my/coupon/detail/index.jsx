import { useState, useRef, useEffect } from 'react';
import { View, Image, PageContainer } from '@tarojs/components';
import CustomNav from '@components/CustomNav';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import Taro, { useRouter, useDidShow } from '@tarojs/taro';
import { CouponService } from '@api/coupon.services';
import { COUPON_STATUS, getCouponData } from '@constants/coupon';
import useAsync from '@hooks/useAsync';
import dayjs from 'dayjs';
import useBoolean from '@hooks/useBoolean';
import { goto, showLoading, hideLoading, showToast, delay } from '@utils/index';
import { PAGES } from '@app.config';
import useStore from '@stores';
import styles from './index.module.scss';
import CodePanel from '../components/CodePanel';
import Signup from '@pages/signup/index';

export default function CouponDetail() {
  const router = useRouter();
  const couponName = decodeURIComponent(router?.params?.id);
  const [signupPageFlag, showSignup, hideSignup] = useBoolean(false);
  const { couponId } = router.params;
  const { COUPON_STATUS_TEXT } = getCouponData();
  const [couponToRedeem, setCouponToRedeem] = useState();

  const { t } = useTranslation();
  // const { isFromDFS } = useStore((state) => state);
  const [isRegister, isLogin] = useStore((state) => {
    return [state?.userInfo?.profile?.status === 'Registered', state.isLogin];
  });
  const {
    value: couponDetail,
    execute: getCouponDetail,
    status: detailStatus,
  } = useAsync(() => {
    return new Promise((resolve, reject) => {
      CouponService.getCouponById(couponName)
        .then((res) => {
          resolve(res.data?.[0].attributes);
        })
        .catch(reject);
    });
  });
  const {
    value: userCoupon,
    execute: getUserCoupon,
    status: couponStatus,
  } = useAsync((id) => {
    return new Promise((resolve, reject) => {
      CouponService.getCoupon({ id })
        .then((res) => {
          resolve(res);
        })
        .catch(reject);
    });
  });
  const {
    value: couponsToBeCollected,
    execute: getCouponsToBeCollected,
    status: listStatus,
  } = useAsync(() => {
    return new Promise((resolve, reject) => {
      showLoading();
      CouponService.getCouponList({
        type: COUPON_STATUS.TO_BE_COLLECTED,
        page: 1,
        pageSize: 100,
      })
        .then(resolve)
        .finally(hideLoading);
    });
  });
  const status =
    userCoupon?.status ??
    router.params.status ??
    couponsToBeCollected?.find((i) => i.name === couponName)?.status ??
    COUPON_STATUS.OOS;
  const disabled =
    [detailStatus, couponStatus].includes('pending') ||
    [COUPON_STATUS.EXPIRED, COUPON_STATUS.REDEEMED, COUPON_STATUS.OOS].includes(status);
  useEffect(() => {
    const pages = Taro.getCurrentPages();
    if (pages.length === 1) return;
    const app = Taro.getApp();
    app.couponListOnShow =
      userCoupon?.status === COUPON_STATUS.COLLECTED ? COUPON_STATUS.COLLECTED : undefined;
  }, [userCoupon?.status]);
  useEffect(() => {
    if (isLogin) {
      getCouponDetail();
      getCouponsToBeCollected();
      couponId && couponId !== 'undefined' && getUserCoupon(couponId);
    }
  }, [isLogin]);

  const handleClick = () => {
    switch (status) {
      case COUPON_STATUS.TO_BE_COLLECTED:
        if (
          dayjs().isAfter(dayjs(couponDetail.validityBefore)) ||
          dayjs().isBefore(dayjs(couponDetail.validityAfter))
        ) {
          return showToast({ title: t('coupon.invalid') });
        }
        showSignup();
        // goto({
        //   url: `${PAGES.SIGNUP}?name=${couponName}&type=coupon`,
        // });
        break;
      case COUPON_STATUS.COLLECTED:
        if (
          dayjs().isAfter(dayjs(userCoupon.validityBefore)) ||
          dayjs().isBefore(dayjs(userCoupon.validityAfter))
        ) {
          return showToast({ title: t('coupon.invalid') });
        }
        if (!isRegister) return showSignup();
        setCouponToRedeem(userCoupon.couponId);
        break;
    }
  };
  const handleRegisterSuccess = async () => {
    await delay(2200);
    switch (status) {
      case COUPON_STATUS.TO_BE_COLLECTED:
        try {
          const data = await CouponService.bindCoupon({ name: couponName });
          if (!data.success) {
            return showToast({
              title: t('coupon.collectFail'),
            });
          }
          await getUserCoupon(data.couponId);
          setCouponToRedeem(data.couponId);
          showToast({
            title: t('coupon.collectSuccess'),
            mask: true,
          });
        } catch (error) {
          showToast({
            title: t('coupon.collectFail'),
          });
        }
        break;
      case COUPON_STATUS.COLLECTED:
        setCouponToRedeem(userCoupon.couponId);
        break;
    }
  };
  const buttonClass = cx([
    styles['couponDetail__button'],
    {
      [styles['couponDetail__button__disabled']]: disabled,
    },
  ]);

  return (
    <View className='page'>
      <CustomNav title={couponDetail?.displayName} />
      <View className={styles['couponDetail']}>
        <View className={styles['couponDetail__detail']}>
          {couponDetail?.descriptionImgs?.data?.length > 0 && (
            <Image
              src={`${CMS_URL}/${couponDetail?.descriptionImgs?.data[0]?.attributes?.url}`}
              mode='widthFix'
            ></Image>
          )}
        </View>
      </View>
      <View>
        {detailStatus === 'success' && listStatus === 'success' && (
          <View className={buttonClass} onClick={handleClick}>
            {COUPON_STATUS_TEXT[status]?.CTA}
          </View>
        )}
      </View>
      <View>
        {couponToRedeem && (
          <CodePanel
            targetCoupon={couponToRedeem}
            onSuccess={() => {
              getUserCoupon(userCoupon.couponId);
            }}
            onClose={() => {
              setCouponToRedeem(undefined);
            }}
          ></CodePanel>
        )}
      </View>
      <PageContainer show={signupPageFlag} onAfterLeave={hideSignup} position='right'>
        <Signup
          onClose={hideSignup}
          ctaText={t('common.submitAndRedeem')}
          inPage
          onSuccess={handleRegisterSuccess}
        ></Signup>
      </PageContainer>
    </View>
  );
}
