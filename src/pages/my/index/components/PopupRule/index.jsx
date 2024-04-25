import { useEffect, useState } from 'react';
import { View, ScrollView, RichText } from '@tarojs/components';
import { filterRichText, showLoading, hideLoading } from '@utils';
import { GlobalService } from '@api/global.services';
import Popup from '@components/Popup';

import styles from './index.module.scss';

export default function PopupRule({ onClose }) {
  const [data, setData] = useState(null);

  const _getData = async () => {
    showLoading();
    const result = await GlobalService.getGlobal();
    const _data = result?.data?.attributes;
    _data.giftRedemptionRules = filterRichText(_data.giftRedemptionRules);
    setData(_data);
    hideLoading();
  };

  useEffect(() => {
    _getData();
  }, []);

  return (
    <Popup onClose={onClose}>
      <View className={styles['popupRule']}>
        <View className={styles['popupRule__title']}>{data?.giftRedemptionRulesTitle}</View>
        <View className={styles['popupRule__content']}>
          <ScrollView
            scrollY
            enhanced
            showScrollbar={false}
            className={styles['popupRule__scroll']}
            lowerThreshold={30}
          >
            <View className={styles['popupRule__scroll__content']}>
              <RichText nodes={data?.giftRedemptionRules}></RichText>
            </View>
          </ScrollView>
        </View>
      </View>
    </Popup>
  );
}
