import { useEffect, useState, useRef } from 'react';
import dayjs from 'dayjs';
import { View, Image, ScrollView, PageContainer } from '@tarojs/components';
import Taro, { usePullDownRefresh, useRouter, useDidShow } from '@tarojs/taro';
import useStore from '@stores';
import useBoolean from '@hooks/useBoolean';
import useAsync from '@hooks/useAsync';
import { CouponService } from '@api/coupon.services';
import { LuckyService } from '@api/lucky.services';
import { showLoading, hideLoading, showToast, delay, goto } from '@utils';
import { TASK } from '@constants/index';
import { PointService } from '@api/point.services';
import { useTranslation } from 'react-i18next';
import { getCouponData, COUPON_STATUS } from '@constants/coupon';
import CustomNav from '@components/CustomNav';
import LoadMore from '@components/LoadMore';
import CouponBanner from '@assets/points/head.png';
import { PAGES } from '@app.config';
import { Tracking } from '@utils/tracking';
import Tabs from './components/Tabs';
import Empty from './components/Empty';
import CouponCard from './components/CouponCard';
import styles from './index.module.scss';
import CodePanel from './components/CodePanel';
import Signup from '@pages/signup/index';

const PAGE_SIZE = 10;

let actionAfterRegister = '';

export default function Coupon() {
  const router = useRouter();
  const { status: defaultStatus } = router.params;
  const { COUPON_STATUS_DATA } = getCouponData();
  const [status, setStatus] = useState(
    COUPON_STATUS_DATA.find((i) => i.value === router.params.status) ?? COUPON_STATUS_DATA[0]
  );
  const [signupPageFlag, showSignup, hideSignup] = useBoolean(false);
  const [couponToRedeem, setCouponToRedeem] = useState();

  const { userInfo, isLogin, isFromDFS } = useStore((state) => state);
  const isRegister = userInfo?.profile?.status === 'Registered';

  const { t } = useTranslation();

  // const checking = useRef(false);
  const {
    value: drawList,
    status: lucyDrawStatus,
    execute: getDrawList,
    reset: resetDrawList,
  } = useAsync(LuckyService.getList);
  const {
    value: couponData,
    status: couponStatus,
    execute: getCouponList,
    reset: resetCouponList,
  } = useAsync((type, page) => {
    return new Promise((resolve, reject) => {
      showLoading();
      CouponService.getCouponList({
        type,
        page,
        pageSize: PAGE_SIZE,
      })
        .then((res) => {
          resolve({
            list: page === 1 ? res : [...couponData.list, ...res],
            page,
            hasMore: res.length === PAGE_SIZE,
          });
        })
        .finally(hideLoading);
    });
  });

  useEffect(() => {
    if (isLogin && status) {
      status.value === COUPON_STATUS.TO_BE_COLLECTED && getDrawList();
      getCouponList(status.value, 1);
    }
    return () => {
      if (status.value === COUPON_STATUS.TO_BE_COLLECTED) {
        resetDrawList();
      }
      resetCouponList();
    };
  }, [isLogin, status]);

  useDidShow(() => {
    const app = Taro.getApp();
    console.log(app.couponListOnShow);
    if (
      app.couponListOnShow !== undefined &&
      app.couponListOnShow === COUPON_STATUS.COLLECTED &&
      app.couponListOnShow !== status.value
    ) {
      // 如果是從未使用的禮券詳情、抽獎詳情返回，則跳到待使用  AWCO-68
      resetCouponList();
      resetDrawList();
      setStatus(COUPON_STATUS_DATA.find((i) => i.value === COUPON_STATUS.COLLECTED));
    } else if (couponStatus !== 'idle') {
      status.value === COUPON_STATUS.TO_BE_COLLECTED && getDrawList();
      getCouponList(status.value, 1);
    }
  });

  const handleScrollToLower = () => {
    if (couponData.hasMore) getCouponList(status.value, couponData.page + 1);
  };

  const handleTabChange = (_status) => {
    setStatus(_status);
  };

  const handleCouponClick = async (item) => {
    const isValidate =
      dayjs().isSame(item?.validityAfter, 'day') ||
      dayjs().isSame(item?.validityBefore, 'day') ||
      (dayjs().isAfter(item?.validityAfter, 'day') &&
        dayjs().isBefore(item?.validityBefore, 'day'));
    if (!isValidate) {
      showToast({
        title: '未在有效期内',
      });
      return;
    }
    if (!isRegister) return showSignup();
    if (item.couponType === 'Coupon') {
      setCouponToRedeem(item.couponId);
    }
    if (item.couponType === 'LuckyDraw') {
      goto({
        url: PAGES.MY_GIFT,
      });
    }
  };
  const handleRegisterSuccess = () => {};

  const handleCouponDetail = async (item) => {
    if (item.status === COUPON_STATUS.LUCKY_DRAW) {
      Tracking.trackEvent('o_lucky1');
      goto({
        url: `${PAGES.DRAW}?name=${item.name}&type=draw`,
      });
    } else {
      if (item.quotaPerAccount === undefined) {
        goto({
          url: `${PAGES.DRAW}?name=${item.name}`,
        });
      } else {
        goto({
          url: `${PAGES.MY_COUPON_DETAIL}?id=${encodeURIComponent(item.id)}&status=${
            item.status
          }&couponId=${item.couponId}`,
        });
      }
    }
  };

  return (
    <View className='page' catchMove>
      <CustomNav title={t('page.title.coupon')} backgroundColor='#edf7ff' />
      <View className={styles['coupon']}>
        <View className={styles['coupon__banner']}>
          <Image src={CouponBanner} mode='aspectFill'></Image>
        </View>
        <View className={styles['coupon__tabs']}>
          <Tabs tabsData={COUPON_STATUS_DATA} onChange={handleTabChange} status={status} />
        </View>
        {(drawList?.length ?? 0) + (couponData?.list?.length ?? 0) === 0 &&
          couponStatus === 'success' && <Empty />}

        {(drawList?.length !== 0 || couponData?.list?.length !== 0) && (
          <ScrollView
            scrollY
            className={styles['coupon__list__scroll']}
            onScrollToLower={handleScrollToLower}
            lowerThreshold={30}
          >
            <View className={styles['coupon__list']}>
              {drawList?.map((item) => (
                <View className={styles['coupon__list__card']} key={item.name}>
                  <CouponCard
                    data={item}
                    onClick={handleCouponDetail}
                    onDetail={handleCouponDetail}
                  />
                </View>
              ))}
              {couponData?.list?.map((item) => (
                <View className={styles['coupon__list__card']} key={item.name}>
                  <CouponCard
                    data={item}
                    onClick={
                      status.value === COUPON_STATUS.COLLECTED
                        ? handleCouponClick
                        : handleCouponDetail
                    }
                    onDetail={handleCouponDetail}
                  />
                </View>
              ))}
              {(drawList?.length > 0 || couponData?.list?.length > 0) && (
                <LoadMore hasMore={couponData?.hasMore} />
              )}
            </View>
          </ScrollView>
        )}
      </View>
      <View>
        {couponToRedeem && (
          <CodePanel
            targetCoupon={couponToRedeem}
            onSuccess={() => {
              getCouponList(status.value, 1);
              resetCouponList();
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
