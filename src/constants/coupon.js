import i18n from '@i18n';

export const COUPON_STATUS = {
  LUCKY_DRAW: 'luckyDraw',
  TO_BE_COLLECTED: 'toBeCollected',
  COLLECTED: 'collected',
  REDEEMED: 'redeemed',
  EXPIRED: 'expired',
  TO_BE_USE: 'toBeUsed',
  OOS: 'oos', // 已領完
};

export const COUPON_STATUS_TEXT = {
  [COUPON_STATUS.LUCKY_DRAW]: {
    TAB: 'LuckyDraw',
    STATUS: 'luckyDraw',
  },
  [COUPON_STATUS.TO_BE_COLLECTED]: {
    TAB: i18n.t('coupon.toBeCollected'),
    STATUS: i18n.t('coupon.toBeCollected'),
  },
  [COUPON_STATUS.COLLECTED]: {
    TAB: i18n.t('coupon.collected'),
    STATUS: i18n.t('coupon.toUse'),
  },
  [COUPON_STATUS.REDEEMED]: {
    TAB: i18n.t('coupon.redeemed'),
    STATUS: i18n.t('coupon.redeemed'),
  },
  [COUPON_STATUS.EXPIRED]: {
    TAB: i18n.t('coupon.expired'),
    STATUS: i18n.t('coupon.expired'),
  },
  [COUPON_STATUS.TO_BE_USE]: {
    TAB: i18n.t('coupon.toBeUse'),
    STATUS: i18n.t('coupon.toBeUse'),
  },
};

export const COUPON_STATUS_DATA = [
  {
    id: 1,
    label: COUPON_STATUS_TEXT[COUPON_STATUS.TO_BE_COLLECTED].TAB,
    value: COUPON_STATUS.TO_BE_COLLECTED,
  },
  {
    id: 2,
    label: COUPON_STATUS_TEXT[COUPON_STATUS.COLLECTED].TAB,
    value: COUPON_STATUS.COLLECTED,
  },
  {
    id: 3,
    label: COUPON_STATUS_TEXT[COUPON_STATUS.REDEEMED].TAB,
    value: COUPON_STATUS.REDEEMED,
  },
  {
    id: 4,
    label: COUPON_STATUS_TEXT[COUPON_STATUS.EXPIRED].TAB,
    value: COUPON_STATUS.EXPIRED,
  },
];

export const getCouponData = () => {
  const _COUPON_STATUS_TEXT = {
    [COUPON_STATUS.LUCKY_DRAW]: {
      TAB: 'LuckyDraw',
      STATUS: 'luckyDraw',
    },
    [COUPON_STATUS.TO_BE_COLLECTED]: {
      TAB: i18n.t('coupon.toBeCollected'),
      STATUS: i18n.t('coupon.toBeCollected'),
      CTA: i18n.t('coupon.cta.toBeCollected'),
    },
    [COUPON_STATUS.COLLECTED]: {
      TAB: i18n.t('coupon.collected'),
      STATUS: i18n.t('coupon.toUse'),
      CTA: i18n.t('coupon.toUse'),
    },
    [COUPON_STATUS.REDEEMED]: {
      TAB: i18n.t('coupon.redeemed'),
      STATUS: i18n.t('coupon.redeemed'),
      CTA: i18n.t('coupon.redeemed'),
    },
    [COUPON_STATUS.EXPIRED]: {
      TAB: i18n.t('coupon.expired'),
      STATUS: i18n.t('coupon.expired'),
      CTA: i18n.t('coupon.expired'),
    },
    [COUPON_STATUS.TO_BE_USE]: {
      TAB: i18n.t('coupon.toBeUse'),
      STATUS: i18n.t('coupon.toBeUse'),
      CTA: i18n.t('coupon.toBeUse'),
    },
    [COUPON_STATUS.OOS]: {
      TAB: i18n.t('coupon.oos'),
      STATUS: i18n.t('coupon.oos'),
      CTA: i18n.t('coupon.oos'),
    },
  };
  const _COUPON_STATUS_DATA = [
    {
      id: 1,
      label: _COUPON_STATUS_TEXT[COUPON_STATUS.TO_BE_COLLECTED].TAB,
      value: COUPON_STATUS.TO_BE_COLLECTED,
    },
    {
      id: 2,
      label: _COUPON_STATUS_TEXT[COUPON_STATUS.COLLECTED].TAB,
      value: COUPON_STATUS.COLLECTED,
    },
    {
      id: 3,
      label: _COUPON_STATUS_TEXT[COUPON_STATUS.REDEEMED].TAB,
      value: COUPON_STATUS.REDEEMED,
    },
    {
      id: 4,
      label: _COUPON_STATUS_TEXT[COUPON_STATUS.EXPIRED].TAB,
      value: COUPON_STATUS.EXPIRED,
    },
  ];
  return {
    COUPON_STATUS_TEXT: _COUPON_STATUS_TEXT,
    COUPON_STATUS_DATA: _COUPON_STATUS_DATA,
  };
};
