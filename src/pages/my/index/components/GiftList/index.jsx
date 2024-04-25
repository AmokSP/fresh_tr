import { useEffect, useState } from 'react';
import { View, Text, Image } from '@tarojs/components';
import { GiftService } from '@api/gift.services';
import useStore from '@stores';
import { useTranslation } from 'react-i18next';
import { goto } from '@utils';
import { PAGES } from '@app.config';
import styles from './index.module.scss';

export default function GiftList({ onRule }) {
  const [listData, setListData] = useState([]);
  const language = useStore((state) => state.language);
  const { t } = useTranslation();

  const _getList = async () => {
    const result = await GiftService.getGifts();
    const data = result.data.slice(0, 3);
    setListData(data);
  };

  useEffect(() => {
    _getList();
  }, [language]);

  return (
    <View className={styles['giftList']}>
      <View className={styles['giftList__title']}>{t('common.memberGifts')}</View>
      <View className={styles['giftList__list']}>
        {listData?.map((item) => {
          return (
            <View
              className={styles['giftList__list__item']}
              key={item.id}
              onClick={() => {
                goto({ url: PAGES.GIFT });
              }}
            >
              <View className={styles['giftList__list__item__image']}>
                <Image
                  src={`${CMS_URL}${item?.attributes?.headerImg?.data?.attributes?.url}`}
                  mode='aspectFill'
                ></Image>
              </View>
              <View className={styles['giftList__list__item__text']}>
                {item?.attributes?.points}
                <Text>{t('common.point')}</Text>
              </View>
            </View>
          );
        })}
      </View>
      <View className={styles['giftList__link__list']}>
        <View
          className={styles['giftList__link__all']}
          onClick={() => {
            goto({ url: PAGES.GIFT });
          }}
        >
          {t('common.allMemberGifts')}
        </View>
        <View
          className={styles['giftList__link__all']}
          onClick={() => {
            onRule && onRule();
          }}
        >
          {t('common.pointRules')}
        </View>
      </View>
    </View>
  );
}
