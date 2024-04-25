import { View } from '@tarojs/components';
import Popup from '@components/Popup';
import { useTranslation } from 'react-i18next';
import styles from './index.module.scss';

export default function PopupConfirm({ onConfirm, onClose, data }) {
  const { t } = useTranslation();
  return (
    <Popup onClose={onClose}>
      <View className={styles['confirm']}>
        <View className={styles['confirm__content']}>
          <View>
            {t('gift.confirm.part1')}
            {data?.points}
            {t('gift.confirm.part2')}
          </View>
          <View className={styles['confirm__content__name']}>{data?.name}</View>
        </View>
        <View
          className={styles['confirm__button']}
          onClick={() => {
            onConfirm && onConfirm();
          }}
        >
          {t('common.confirm')}
        </View>
      </View>
    </Popup>
  );
}
