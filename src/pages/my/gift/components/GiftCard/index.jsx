import { View, Image, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import ExpireImage from '@assets/coupon/icon-expired.png';
import styles from './index.module.scss';

export default function CouponCard({ data, onSubmit, status }) {
  const createdDate = data?.createdDate;
  const dueDate = dayjs(createdDate).add(7, 'day').format('M.D');
  const { t } = useTranslation();

  const handleAgreePrivacyAuthorization = (_data) => {
    onSubmit && onSubmit(_data);
  };

  return (
    <View className={styles['giftCard']}>
      <View className={styles['giftCard__image']}>
        <Image
          src={`${CMS_URL}${data?.gift?.headerImg?.data?.attributes?.url}`}
          mode='aspectFill'
        ></Image>
      </View>
      <View className={styles['giftCard__content']}>
        <View className={styles['giftCard__content__top']}>
          <View className={styles['giftCard__content__title']}>{data?.gift?.name}</View>
          {data?.orderStatus === 'create' && (
            <View className={styles['giftCard__content__subtitle']}>
              {t('myGift.tip.part1')}
              {dueDate}
              {t('myGift.tip.part2')}
            </View>
          )}
        </View>
        <View className={styles['giftCard__content__bottom']}>
          {data?.orderStatus === 'submit' && status !== 'create' && (
            <View className={styles['giftCard__submit']}>{t('myGift.waitToSend')}</View>
          )}
          {data?.orderStatus === 'shipping' && (
            <View className={styles['giftCard__content__deliver']}>
              <View className={styles['giftCard__content__deliver__no']}>
                {t('common.shippingNo')}: {data?.expressNumber || '暂无数据'}
              </View>
              <View className={styles['giftCard__content__deliver__company']}>
                {t('common.shippingName')}: {data?.expressName || '暂无数据'}
              </View>
            </View>
          )}
          {data?.orderStatus === 'submit' && status === 'create' && (
            <View className={styles['giftCard__content__button__disabled']}>
              {t('myGift.tabs.submit')}
            </View>
          )}
          {data?.orderStatus === 'create' && (
            <Button
              className={styles['giftCard__content__button']}
              openType='agreePrivacyAuthorization'
              onClick={() => {
                handleAgreePrivacyAuthorization(data);
              }}
            >
              {t('myGift.goFill')}
            </Button>
          )}
          {data?.orderStatus === 'expired' && (
            <View className={styles['giftCard__content__button__disabled']}>
              {t('myGift.tabs.expired')}
            </View>
          )}
        </View>
      </View>
      {data?.orderStatus === 'expired' && (
        <View className={styles['giftCard__expired']}>
          <Image src={ExpireImage} mode='aspectFill'></Image>
        </View>
      )}
    </View>
  );
}
