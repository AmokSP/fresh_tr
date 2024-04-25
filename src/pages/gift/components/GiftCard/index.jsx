import { View, Image } from '@tarojs/components';
import { showToast } from '@utils/index';
import { useTranslation } from 'react-i18next';
import useStore from '@stores';
import dayjs from 'dayjs';
import styles from './index.module.scss';

export default function GiftCard({ data, onClick }) {
  const fromDate = dayjs(data?.validityAfter).format('M.D');
  const toDate = dayjs(data?.validityBefore).format('M.D');
  const userPoints = useStore((state) => state.userInfo.summaryPoints);
  const canRedeem = userPoints >= data?.points;
  const isExpired = !(
    dayjs().isAfter(data?.validityAfter) && dayjs().isBefore(data?.validityBefore)
  );
  const { t } = useTranslation();

  return (
    <View className={styles['pointCard']}>
      <View className={styles['pointCard__image']}>
        <Image
          src={`${CMS_URL}${data?.headerImg?.data?.attributes?.url}`}
          mode='aspectFill'
        ></Image>
      </View>
      <View className={styles['pointCard__title']}>{data?.name}</View>
      <View className={styles['pointCard__title']}>
        {t('common.redeemTime')}：{fromDate}-{toDate}
      </View>
      <View className={styles['pointCard__points']}>
        {data?.points}
        {t('common.point')}
      </View>
      {canRedeem && (
        <View
          className={styles['pointCard__button']}
          onClick={() => {
            if (isExpired) {
              showToast({
                title: t('common.notStartYet'),
              });
              return;
            }
            onClick && onClick();
          }}
        >
          {t('common.instantRedeem')}
        </View>
      )}
      {!canRedeem && (
        <View className={styles['pointCard__button__disabled']}>{t('common.notEnoughPoint')}</View>
      )}
    </View>
  );
}
