/*
 * @Author: Junjie Yu amoksp@live.com
 * @Date: 2023-11-06 09:07:12
 * @LastEditors: Junjie Yu amoksp@live.com
 * @LastEditTime: 2023-12-08 17:09:32
 * @FilePath: \freshtr\src\pages\my\coupon\components\CouponCard\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { View, Image } from '@tarojs/components';
import IconUsed from '@assets/coupon/icon-used.png';
import IconExpired from '@assets/coupon/icon-expired.png';
import CouponImage from '@assets/coupon/coupon.png';
import { COUPON_STATUS, getCouponData } from '@constants/coupon';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import dayjs from 'dayjs';
import styles from './index.module.scss';

export default function CouponCard({ onClick, data, onDetail }) {
  const dueDate = dayjs(data?.validityBefore).format('YYYY.MM.DD');

  const { COUPON_STATUS_TEXT } = getCouponData();
  const { t } = useTranslation();

  const disabled =
    data?.status === COUPON_STATUS.REDEEMED || data?.status === COUPON_STATUS.EXPIRED;

  const couponClass = classNames([
    styles['couponCard__wrap'],
    {
      [styles['couponCard__wrap__disabled']]: disabled,
    },
  ]);

  const handleClick = (_data) => {
    onClick && onClick(_data);
  };

  const handleDetail = (_data) => {
    onDetail && onDetail(_data);
  };

  const getToUseText = () => {
    switch (true) {
      case data.status === COUPON_STATUS.TO_BE_COLLECTED && data.luckyDraw:
        return t('draw.toDraw');
      case data.status === COUPON_STATUS.COLLECTED && data.couponType === 'LuckyDraw':
        return t('coupon.toDeliver');
      default:
        return COUPON_STATUS_TEXT[data.status].STATUS;
    }
  };

  return (
    <View className={styles['couponCard']}>
      <View className={couponClass}>
        <View className={styles['couponCard__content']}>
          <View className={styles['couponCard__content__info']}>
            <View className={styles['couponCard__content__info__title']}>{data?.displayName}</View>
            <View className={styles['couponCard__content__info__desc']}>{data?.description}</View>
            <View className={styles['couponCard__content__info__due']}>
              {dueDate} 到期
              {(data?.luckyDraw || data?.descriptionImgs?.data) && (
                <View
                  className={styles['couponCard__content__info__detail']}
                  onClick={() => {
                    handleDetail(data);
                  }}
                >
                  {t('common.detail')}
                </View>
              )}
            </View>

            <View className={styles['couponCard__content__info__image']}>
              <Image
                src={`${CMS_URL}${data?.image?.data?.attributes?.url}`}
                mode='aspectFit'
              ></Image>
            </View>
          </View>
          <View
            className={styles['couponCard__content__status']}
            onClick={() => {
              handleClick(data);
            }}
          >
            {getToUseText()}
          </View>
        </View>
        <View className={styles['couponCard__bg']}>
          <Image src={CouponImage} mode='aspectFill'></Image>
        </View>
      </View>
      <View className={styles['couponCard__status__icon']}>
        {data.status === COUPON_STATUS.REDEEMED && <Image src={IconUsed} mode='widthFix'></Image>}
        {data.status === COUPON_STATUS.EXPIRED && <Image src={IconExpired} mode='widthFix'></Image>}
      </View>
    </View>
  );
}
