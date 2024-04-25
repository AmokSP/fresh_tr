import { PAGES } from '@app.config';
import IconHome from '@assets/tabbar/home.png';
import IconInfo from '@assets/tabbar/info.png';
import IconMy from '@assets/tabbar/my.png';
import IconProduct from '@assets/tabbar/product.png';
import IconStore from '@assets/tabbar/location.png';
import IconCoupon from '@assets/tabbar/coupon.png';

const TAB_BAR = [
  {
    index: 0,
    pagePath: PAGES.INDEX,
    text: '首页',
    langIndex: 'home',
    iconPath: IconHome,
    selectedIconPath: IconHome,
  },
  {
    index: 1,
    pagePath: PAGES.CATEGORY,
    langIndex: 'product',
    text: '产品',
    iconPath: IconProduct,
    selectedIconPath: IconProduct,
  },
  // {
  //   index: 2,
  //   pagePath: PAGES.NEWS,
  //   text: '资讯',
  //   langIndex: 'news',
  //   iconPath: IconInfo,
  //   selectedIconPath: IconInfo,
  // },
  {
    index: 3,
    pagePath: PAGES.STORE,
    text: '门店',
    langIndex: 'store',
    iconPath: IconStore,
    selectedIconPath: IconStore,
  },
  {
    index: 4,
    pagePath: PAGES.MY,
    langIndex: 'my',
    text: '我的',
    iconPath: IconMy,
    selectedIconPath: IconMy,
  },
];

// DFS线下扫码进入用户，'我的'->'礼券'
export const DFS_TAB_BAR = [
  ...TAB_BAR.slice(0, 4),
  {
    index: 4,
    pagePath: PAGES.MY,
    langIndex: 'coupon',
    text: '我的',
    iconPath: IconCoupon,
    selectedIconPath: IconCoupon,
  },
];

export default TAB_BAR;
