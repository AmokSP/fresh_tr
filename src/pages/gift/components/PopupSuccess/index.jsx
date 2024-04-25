import { View, Text, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import Popup from '@components/Popup';
import { goto, showToast, delay } from '@utils';
import { PAGES } from '@app.config';
import { GiftService } from '@api/gift.services';
import { useTranslation } from 'react-i18next';
import styles from './index.module.scss';

export default function PopupSuccess({ onClose, orderId }) {
  const { t } = useTranslation();

  const handleAgreePrivacyAuthorization = () => {
    _submitGift();
    onClose && onClose();
  };

  const _submitGift = async () => {
    Taro.chooseAddress({
      success: async (e) => {
        const params = {
          giftId: orderId,
          address: e.detailInfo,
          city: e.cityName,
          name: e.userName,
          phone: e.telNumber,
          province: e.provinceName,
          region: e.countyName,
        };
        await GiftService.submitGift(params);
        showToast({
          title: t('gift.fillSuccess'),
        });
        await delay(2000);
        goto({
          url: `${PAGES.MY_GIFT}?status=submit`,
        });
      },
    });
  };

  return (
    <Popup onClose={onClose}>
      <View className={styles['success']}>
        <View className={styles['success__content']}>
          <View className={styles['success__content__title']}>{t('gift.success.title')}</View>
          <View className={styles['success__content__desc']}>
            <View> {t('gift.success.tip.part1')}</View>
            <View>
              {t('gift.success.tip.part2')}
              <Text
                onClick={() => {
                  goto({ url: PAGES.MY_GIFT });
                  onClose && onClose();
                }}
              >
                {t('gift.success.tip.part3')}
              </Text>
              {t('gift.success.tip.part4')}
            </View>
          </View>
        </View>
        <Button
          className={styles['success__button']}
          openType='agreePrivacyAuthorization'
          onClick={handleAgreePrivacyAuthorization}
        >
          {t('gift.goFill')}
        </Button>
      </View>
    </Popup>
  );
}
