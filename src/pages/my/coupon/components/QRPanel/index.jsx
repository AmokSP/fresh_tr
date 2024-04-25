import { View, Text } from '@tarojs/components';
import CouponPopup from '@components/CouponPopup';
import { goto } from '@utils/index';
import { PAGES } from '@app.config';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import styles from './index.module.scss';

export default function QRPanel({ onClose, qrCode, coupon }) {
  const dueDate = dayjs(coupon.validityBefore).format('YYYY年M月D日');
  const { t } = useTranslation();
  return (
    <CouponPopup onClose={onClose}>
      <View className={styles['qr']}>
        <View className={styles['qr__title']}>{t('coupon.qr.title')}</View>
        <View className={styles['qr__image']}>
          <image src={qrCode} mode='widthFix'></image>
        </View>
        <View className={styles['qr__desc']}>
          <View>
            {t('coupon.qr.desc.part1')}
            <Text
              style='textDecoration:underline'
              onClick={() => {
                goto({
                  url: `${PAGES.STORE_RESTRICT}?couponRedeem=true`,
                });
              }}
            >
              {t('coupon.qr.desc.part2')}
            </Text>
            {t('coupon.qr.desc.part3')}
          </View>
          <View className={styles['qr__tip']}>
            <View>*{t('coupon.qr.tip')}</View>
          </View>
        </View>
      </View>
    </CouponPopup>
  );
}
