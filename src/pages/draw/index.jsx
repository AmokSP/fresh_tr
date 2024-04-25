import { useEffect, useState } from 'react';
import { View, Image, PageContainer } from '@tarojs/components';
import CustomNav from '@components/CustomNav';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import Taro, { useRouter, useDidShow } from '@tarojs/taro';
import { LuckyService } from '@api/lucky.services';
import { goto, showLoading, hideLoading, showToast } from '@utils/index';
import { PAGES } from '@app.config';
import useStore from '@stores';
import { Tracking } from '@utils/tracking';
import Signup from '@pages/signup/index';

import PopupSuccess from './components/PopupSuccess';
import PopupMiss from './components/PopupMiss';

import styles from './index.module.scss';
import useAsync from '@hooks/useAsync';
import useBoolean from '@hooks/useBoolean';
import dayjs from 'dayjs';
import { CouponService } from '@api/coupon.services';
import { COUPON_STATUS, getCouponData } from '@constants/coupon';

export default function Draw() {
  const [successPopupFlag, showSuccess, hideSuccess] = useBoolean(false);
  const [missPopupFlag, showMiss, hideMiss] = useBoolean(false);
  const [signupPageFlag, showSignup, hideSignup] = useBoolean(false);
  const { COUPON_STATUS_TEXT } = getCouponData();
  const { t } = useTranslation();
  const router = useRouter();
  const [isRegister, isLogin] = useStore((state) => {
    return [state?.userInfo?.profile?.status === 'Registered', state.isLogin];
  });
  const { name: routerName } = router.params;
  const { value: luckyDrawData, execute: getLuckyDraw } = useAsync(LuckyService.getLuckyDraw);
  const {
    value: drawnCoupon,
    status: fetchingStatus,
    execute: getDrawnCoupon,
  } = useAsync(async () => {
    showLoading();
    try {
      const allLuckyDraw = await LuckyService.getList();
      // 如果在未抽奖列表中找到该项，则视为未抽奖
      if (allLuckyDraw.findIndex((i) => i.name === routerName) !== -1) {
        hideLoading();
        return { data: null, status: COUPON_STATUS.TO_BE_COLLECTED };
      }

      // 抽奖成功后，系统发放一个COUPON，由于接口限制，需从如下列表中查找对应项
      const all = await Promise.all(
        [
          COUPON_STATUS.COLLECTED, // 已抽中/领取，未核销
          COUPON_STATUS.REDEEMED, // 已核销， 通过CODE或者线上领取
          COUPON_STATUS.EXPIRED, // 未核销，已过期
        ].map((type) => {
          return CouponService.getCouponList({ type, pageSize: 100 });
        })
      );
      hideLoading();
      const coupon = all.flatMap((li) => li).find((i) => i.name === routerName);

      return coupon === undefined
        ? // 若不存在该项，则视为已抽奖
          {
            data: null,
            status: 'isDrawn',
          }
        : {
            data: coupon, // 用户coupon
            status: coupon.status,
          };
    } catch (error) {
      hideLoading();
      return { data: null, status: COUPON_STATUS.TO_BE_COLLECTED };
    }
  });
  const { value: drawResult, execute: drawPrize } = useAsync(LuckyService.drawPrize);
  // 登陆后再请求
  useEffect(() => {
    if (isLogin) {
      getLuckyDraw(routerName);
      getDrawnCoupon();
    }
  }, [isLogin]);
  useEffect(() => {
    const app = Taro.getApp();
    app.couponListOnShow =
      drawnCoupon?.status === COUPON_STATUS.COLLECTED ? COUPON_STATUS.COLLECTED : undefined;
  }, [drawnCoupon?.status]);
  useDidShow(() => {
    if (fetchingStatus !== 'idle') {
      getDrawnCoupon();
    }
  });

  // 根据返回显示抽奖结果
  useEffect(() => {
    if (drawResult === null) {
      return; // 还未抽奖
    }
    drawResult.success ? showSuccess(true) : showMiss(true);
  }, [drawResult]);

  const handleDrawPrice = () => {
    if (
      dayjs().isAfter(dayjs(luckyDrawData.validityBefore)) ||
      dayjs().isBefore(dayjs(luckyDrawData.validityAfter))
    ) {
      return showToast({ title: t('coupon.invalid') });
    }
    showSignup();
  };
  const handleToUse = () => {
    if (
      dayjs().isAfter(dayjs(drawnCoupon.data.validityBefore)) ||
      dayjs().isBefore(dayjs(drawnCoupon.data.validityAfter))
    ) {
      return showToast({ title: t('coupon.invalid') });
    }
    goto({
      url: PAGES.MY_GIFT,
    });
  };

  const handleRegisterSuccess = () => {
    setTimeout(async () => {
      Tracking.trackEvent('o_lucky2');
      await drawPrize(luckyDrawData.name);
      getDrawnCoupon();
    }, 2200);
  };

  const buttonClass = cx([
    styles['draw__button'],
    {
      [styles['draw__button__disabled']]:
        [COUPON_STATUS.REDEEMED, COUPON_STATUS.EXPIRED, 'isDrawn'].includes(drawnCoupon?.status) ||
        fetchingStatus === 'pending',
    },
  ]);
  return (
    <View className='page'>
      <CustomNav title={luckyDrawData?.title ?? t('page.title.draw')} />
      <View className={styles['draw']}>
        <View className={styles['draw__detail']}>
          <Image
            src={`${CMS_URL}/${luckyDrawData?.descriptionImg?.data?.[0]?.attributes?.url}`}
            mode='widthFix'
          ></Image>
        </View>
      </View>
      <View>
        {drawnCoupon && (
          <View
            className={buttonClass}
            onClick={drawnCoupon?.status === 'collected' ? handleToUse : handleDrawPrice}
          >
            {luckyDrawData?.luckyDraw
              ? t(`draw.button.${drawnCoupon?.status}`)
              : COUPON_STATUS_TEXT[drawnCoupon?.status].CTA}
          </View>
        )}
      </View>
      <View>{missPopupFlag && <PopupMiss onClose={hideMiss} onConfirm={hideMiss} />}</View>
      <View>
        {successPopupFlag && (
          <PopupSuccess
            onClose={hideSuccess}
            onConfirm={() => {
              hideSuccess();
              goto({
                url: PAGES.MY_GIFT,
              });
            }}
          />
        )}
      </View>
      <PageContainer show={signupPageFlag} onAfterLeave={hideSignup} position='right'>
        <Signup
          onClose={hideSignup}
          ctaText={
            luckyDrawData?.luckyDraw ? t('common.submitAndDraw') : t('common.submitAndRedeem')
          }
          inPage
          onSuccess={handleRegisterSuccess}
        ></Signup>
      </PageContainer>
    </View>
  );
}
