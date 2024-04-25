/*
 * @Author: Junjie Yu amoksp@live.com
 * @Date: 2023-11-17 13:26:02
 * @LastEditors: Junjie Yu amoksp@live.com
 * @LastEditTime: 2023-12-05 09:44:24
 * @FilePath: \freshtr\src\pages\my\coupon\components\RedeemedPanel\index.tsx
 * @Description: 线下DFS扫码进入的用户，在核销礼券后展示的弹窗
 */
import React from 'react';
import s from './index.module.scss';
import RoundClose from '@assets/icons/dfs/round-close.svg';
import RedeemPopupBg from '@assets/icons/dfs/redeem-popup-bg.svg';
import { View, Image, Text } from '@tarojs/components';
import { useTranslation } from 'react-i18next';
import { goto } from '@utils/index';
import { PAGES } from '@app.config';
export default React.memo(({ onClose = undefined }: { onClose?: () => void }) => {
  const { t } = useTranslation();
  return (
    <View className={s.redeemPanel}>
      <Image src={RedeemPopupBg} className={s.bg}></Image>
      <Image onClick={onClose} src={RoundClose} className={s.close} />
      <View className={s.content}>
        <Text className={s.title}>{t('coupon.dfsPopup.title')}</Text>
        <Text className={s.subTitle}>{t('coupon.dfsPopup.subTitle')}</Text>
        <View
          onClick={() => {
            goto({
              url: PAGES.INDEX,
            });
          }}
          className={s.ctaHome}
        >
          {t('coupon.dfsPopup.ctaHome')}
        </View>
        <View
          onClick={() => {
            goto({
              url: PAGES.CATEGORY,
            });
          }}
          className={s.ctaMore}
        >
          {t('coupon.dfsPopup.ctaMore')}
        </View>
      </View>
    </View>
  );
});
