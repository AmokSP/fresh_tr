import { View, Text } from '@tarojs/components';
import { goto } from '@utils/index';
import { PAGES } from '@app.config';
import Popup from '@components/Popup';
import { useTranslation } from 'react-i18next';
import styles from './index.module.scss';

export default function PopupSuccess({ onConfirm, onClose }) {
  const { t } = useTranslation();
  return (
    <Popup onClose={onClose}>
      <View className={styles['success']}>
        <View className={styles['success__content']}>
          <View className={styles['success__content__title']}>{t('draw.win.title')}</View>
          <View className={styles['success__content__body']}>
            <View>{t('draw.win.body.part1')}</View>
            <View>
              {t('draw.win.body.part2')}
              <Text
                style={{ textDecoration: 'underline', fontWeight: 'bold' }}
                onClick={() => {
                  goto({ url: PAGES.MY_GIFT });
                }}
              >
                {t('draw.win.body.part3')}
              </Text>
              {t('draw.win.body.part4')}
            </View>
          </View>
        </View>
        <View className={styles['success__button']} onClick={onConfirm}>
          {t('common.confirm')}
        </View>
      </View>
    </Popup>
  );
}
