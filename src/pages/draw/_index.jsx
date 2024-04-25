import { useEffect, useState } from 'react';
import { View, Image } from '@tarojs/components';
import CustomNav from '@components/CustomNav';
import cx from 'classnames';
import { plus, minus } from '@assets/icons';
import { useTranslation } from 'react-i18next';
import { LuckyService } from '@api/lucky.services';
import useStore from '@stores';

import Hero from './components/Hero';
import PopupSuccess from './components/PopupSuccess';
import PopupMiss from './components/PopupMiss';

import styles from './index.module.scss';

export default function Draw() {
  const [showDetail, setShowDetail] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showMiss, setShowMiss] = useState(false);
  const [data, setData] = useState(null);
  const { t } = useTranslation();
  const isRegister = useStore((state) => state?.userInfo?.profile?.status) === 'Registered';

  const _getData = async () => {
    const result = await LuckyService.getLuckyDraw();
    console.log('result', result);
    setData(result?.data[0]?.attributes);
  };

  useEffect(() => {
    _getData();
  }, []);

  const buttonClass = cx([
    styles['draw__button'],
    // {
    //   [styles["draw__button__disabled"]]: isRegister,
    // },
  ]);

  return (
    <View className='page'>
      <CustomNav title={t('page.title.draw')} />
      <View className={styles['draw']}>
        <View className={styles['draw__hero']}>
          <Hero data={data?.rotateImg?.data} />
        </View>

        <View className={styles['draw__content']}>
          <View className={styles['draw__content__title']}>{data?.giftName}</View>
          <View className={styles['draw__content__subtitle']}>{data?.giftDescription}</View>
          <View className={styles['draw__content__tag']}>
            <View className={styles['draw__content__tag__item']}>
              <View className={styles['draw__content__tag__item__label']}>{t('draw.brand')}</View>
              <View className={styles['draw__content__tag__item__value']}>{data?.brand}</View>
            </View>
            <View className={styles['draw__content__tag__item']}>
              <View className={styles['draw__content__tag__item__label']}>{t('draw.sku')}</View>
              <View className={styles['draw__content__tag__item__value']}>{data?.volume}</View>
            </View>
            <View className={styles['draw__content__tag__item']}>
              <View className={styles['draw__content__tag__item__label']}>{t('draw.type')}</View>
              <View className={styles['draw__content__tag__item__value']}>{data?.type}</View>
            </View>
          </View>
        </View>

        <View className={styles['draw__detail']}>
          <View className={styles['draw__detail__header']}>
            <View
              className={styles['draw__detail__header__wrap']}
              onClick={() => {
                setShowDetail(!showDetail);
              }}
            >
              <View className={styles['draw__detail__header__label']}>{t('draw.detail')}</View>
              <View className={styles['draw__detail__header__label__icon']}>
                <Image src={showDetail ? minus : plus} mode='widthFix'></Image>
              </View>
            </View>
          </View>
          {showDetail && (
            <View className={styles['draw__detail__content']}>
              <Image
                src={`${CMS_URL}${data?.descriptionImg?.data[0]?.attributes?.url}`}
                mode='widthFix'
              ></Image>
            </View>
          )}
        </View>
      </View>
      <View className={buttonClass}>
        {isRegister && t('draw.button.register')}
        {!isRegister && t('draw.button.unRegister')}
      </View>
      {showMiss && (
        <PopupMiss
          onClose={() => {
            setShowMiss(false);
          }}
          onConfirm={() => {
            setShowMiss(false);
          }}
        />
      )}
      {showSuccess && (
        <PopupSuccess
          onClose={() => {
            setShowSuccess(false);
          }}
          onConfirm={() => {
            setShowSuccess(false);
          }}
        />
      )}
    </View>
  );
}
