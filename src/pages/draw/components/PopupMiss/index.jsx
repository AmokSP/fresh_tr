import { View } from '@tarojs/components';
import { goto } from '@utils/index';
import { PAGES } from '@app.config';
import Popup from '@components/Popup';
import { useTranslation } from 'react-i18next';
import styles from './index.module.scss';

export default function PopupMiss({ onConfirm, onClose }) {
  const { t } = useTranslation();
  return (
    <Popup onClose={onClose}>
      <View className={styles['miss']}>
        <View className={styles['miss__content']}>
          <View className={styles['miss__content__title']}>
            <View>{t('draw.miss.title1')}</View>
            <View>{t('draw.miss.title2')}</View>
          </View>
          <View className={styles['miss__content__body']}>
            <View>{t('draw.miss.title3')}</View>
          </View>
        </View>
        <View
          className={styles['miss__button']}
          onClick={() => {
            goto({
              url: PAGES.MY_COUPON,
              type: 'reLaunch',
            });
            onConfirm && onConfirm();
          }}
        >
          {t('draw.miss.confirm')}
        </View>
        <View
          className={styles['miss__button__home']}
          onClick={() => {
            goto({
              url: PAGES.INDEX,
              type: 'reLaunch',
            });
          }}
        >
          {t('common.exploreMore')}
        </View>
      </View>
    </Popup>
  );
}
