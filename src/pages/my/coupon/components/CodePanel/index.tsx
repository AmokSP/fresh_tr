import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import s from './index.module.scss';
import RoundClose from '@assets/icons/dfs/round-close.svg';
import Eye from '@assets/icons/dfs/eye.svg';
import EyeClose from '@assets/icons/dfs/eye-close.svg';
import { View, Image, Text, Input } from '@tarojs/components';
import { useTranslation } from 'react-i18next';
import { goto, hideLoading, showLoading } from '@utils/index';
import { PAGES } from '@app.config';
import useBoolean from '@hooks/useBoolean';
import useAsync from '@hooks/useAsync';
import { CouponService } from '@api/coupon.services';
import { PointService } from '@api/point.services';
import { TASK } from '@constants/index';
import RedeemedPanel from '../RedeemedPanel';
export default React.memo(
  ({
    targetCoupon,
    onClose,
    onSuccess,
  }: {
    targetCoupon: any;
    onSuccess?: () => void;
    onClose?: () => void;
  }) => {
    const [passwordVisible, , , togglePswVisibility] = useBoolean(false);
    const [code, setCode] = useState('');
    const { t } = useTranslation();
    const {
      status: bindResult,
      execute: bindCoupon,
      reset: resetBinding,
    } = useAsync(async () => {
      return new Promise((resolve, reject) => {
        if (targetCoupon.needRedeemPwd) {
          if (code === '') {
            return reject('empty');
          }
          showLoading();
          CouponService.userRedeem(targetCoupon.couponId, code)
            .then(({ success }) => {
              if (success) {
                PointService.fireTask({ name: TASK.REDEEM_VOUCHER });
                resolve(null);
              } else {
                reject();
              }
            })
            .catch(reject)
            .finally(hideLoading);
        } else {
          showLoading();
          CouponService.autoRedeem(targetCoupon.couponId)
            .then(({ success }) => {
              if (success) {
                PointService.fireTask({ name: TASK.REDEEM_VOUCHER });
                resolve(null);
              } else {
                reject();
              }
            })
            .catch(reject)
            .finally(hideLoading);
        }
      });
    });
    useEffect(() => {
      if (bindResult === 'success') {
        onSuccess?.();
      }
    }, [bindResult]);
    const handleInput = (e) => {
      resetBinding();
      setCode(e.detail.value);
    };
    return (
      <View className={cx(s.codePanel, 'slideUp')}>
        {bindResult === 'success' ? (
          <RedeemedPanel onClose={onClose}></RedeemedPanel>
        ) : (
          <View className={s.panel}>
            <Image onClick={onClose} src={RoundClose} className={s.close} />
            {targetCoupon.needRedeemPwd ? (
              <View className={s.content}>
                <Text className={s.title}>{t('coupon.codePanel.title')}</Text>

                <View className={s.desc}>
                  <View>
                    {t('coupon.qr.desc.part1')}
                    <Text
                      style='textDecoration:underline'
                      onClick={() => {
                        goto({
                          url: `${PAGES.STORE_RESTRICT}?couponRedeem=true`,
                        });
                      }}
                    >
                      {t('coupon.qr.desc.part2')}
                    </Text>
                    {t('coupon.qr.desc.part3')}
                  </View>
                  <View className={s['qr__tip']}>
                    <View>*{t('coupon.qr.tip')}</View>
                  </View>
                </View>

                <View className={s.inputWrapper}>
                  <Input
                    onInput={handleInput}
                    onConfirm={handleInput}
                    value={code}
                    password={!passwordVisible}
                    placeholder={t('coupon.codePanel.placeHolder')}
                    className={cx(s.input, { [s.error]: bindResult === 'error' })}
                  ></Input>
                  <Image
                    src={passwordVisible ? EyeClose : Eye}
                    onClick={togglePswVisibility}
                    className={s.eye}
                  ></Image>
                  {bindResult === 'error' && (
                    <View className={s.errmsg}>{t('coupon.codePanel.errorMsg')}</View>
                  )}
                </View>
                <View
                  onClick={bindResult === 'pending' ? undefined : bindCoupon}
                  className={s.ctaHome}
                >
                  {t('common.confirm2')}
                </View>
              </View>
            ) : (
              <View className={s.content} style={{ paddingTop: '80rpx', paddingBottom: '80rpx' }}>
                <View className={s.desc}>
                  <View>
                    {t('coupon.qr_hideaway.desc.part1')}
                    <Text
                      style='textDecoration:underline'
                      onClick={() => {
                        goto({
                          url: `${PAGES.STORE_RESTRICT}?couponRedeem=true&hideaway=true`,
                        });
                      }}
                    >
                      {t('coupon.qr_hideaway.desc.part2')}
                    </Text>
                    {t('coupon.qr_hideaway.desc.part3')}
                  </View>
                  <View className={s['qr__tip']}>
                    <View>*{t('coupon.qr_hideaway.tip')}</View>
                  </View>
                </View>

                <View className={s.inputWrapper}></View>
                <View
                  onClick={bindResult === 'pending' ? undefined : bindCoupon}
                  className={s.ctaHome}
                >
                  {t('coupon.qr_hideaway.cta')}
                </View>
                <View className={s['qr__tip']}>
                  <View>*{t('coupon.qr_hideaway.tip2')}</View>
                </View>
              </View>
            )}
          </View>
        )}
      </View>
    );
  }
);
