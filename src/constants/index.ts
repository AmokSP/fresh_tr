import { PAGES } from '@app.config';

export const TAB_PATHS = [PAGES.INDEX, PAGES.NEWS, PAGES.CATEGORY, PAGES.MY, PAGES.STORE];

export const AUTH_PAGES = [
  // PAGES.MY_COUPON,
  PAGES.EDIT_PROFILE,
  PAGES.MY_POINT,
  PAGES.MY_GIFT,
  PAGES.GIFT,
  PAGES.MY_WISH,
];

export enum TASK {
  SHARE_ARTICLE = 'ShareArticle',
  REDEEM_VOUCHER = 'RedeemVoucher',
  COLLECT_PRODUCT = 'CollectProduct',
  Subscribe_LS = 'SubscribeLS',
  Share_Product = 'ShareProduct',
  Play_GAME = 'playGame',
  Complete_Register = 'completeRegister',
}

export const REG_MOBILE = /^1[3456789]\d{9}$/;
