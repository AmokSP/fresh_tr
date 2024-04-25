import { View, Image } from '@tarojs/components';
import { useTranslation } from 'react-i18next';
import EmptyImage from '@assets/coupon/gift.png';
import styles from './index.module.scss';

export default function Empty() {
  const { t } = useTranslation();
  return (
    <View className={styles['empty']}>
      <View className={styles['empty__icon']}>
        <Image src={EmptyImage} mode='widthFix'></Image>
      </View>
      <View className={styles['empty__text']}>{t('common.noData')}</View>
    </View>
  );
}
