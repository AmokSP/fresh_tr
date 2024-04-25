import { View, Image } from '@tarojs/components';
import { useTranslation } from 'react-i18next';
import EmptyImage from '@assets/wishlist/empty.png';
import styles from './index.module.scss';

export default function WishEmpty() {
  const { t } = useTranslation();
  return (
    <View className={styles['empty']}>
      <View className={styles['empty__image']}>
        <Image src={EmptyImage} mode='aspectFill'></Image>
      </View>
      <View className={styles['empty__text']}>{t('wish.noData')}</View>
    </View>
  );
}
