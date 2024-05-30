export enum PAGES {
  INDEX = '/pages/index/index',
  CATEGORY = '/pages/category/index',
  CATEGORY_DETAIL = '/pages/category/detail/index',
  CAMPAIGN = '/pages/campaign/index',
  PRODUCT = '/pages/product/index',
  POLICY = '/pages/policy/index',
  POLICY_STORE = '/pages/policy/store/index',
  NEWS = '/pages/news/index/index',
  NEWS_DETAIL = '/pages/news/detail/index',
  NEWS_KOL_DETAIL = '/pages/news/koldetail/index',
  WEBVIEW = '/pages/webview/index',
  SIGNUP = '/pages/signup/index/index',
  EDIT_PROFILE = '/pages/signup/edit/index',
  GIFT = '/pages/gift/index',
  MY = '/pages/my/index/index',
  MY_GIFT = '/pages/my/gift/index',
  MY_WISH = '/pages/my/wish/index',
  MY_POINT = '/pages/my/point/index',
  MY_COUPON = '/pages/my/coupon/index',
  MY_COUPON_DETAIL = '/pages/my/coupon/detail/index',
  STORE = '/pages/store/index',
  STORE_RESTRICT = '/pages/store/restrict/index',
  SEARCH = '/pages/search/index',
  DRAW = '/pages/draw/index',
}
export enum HIDEAWAY {
  INDEX = '/package-hideaway/pages/index/index',
  // CITY_MAP = '/package-hideaway/pages/city-map/index',
  // CITY_DETAIL = '/package-hideaway/pages/city-map/detail/index',
  KOL_STORY = '/package-hideaway/pages/kol-story/index',
  POSTER = '/package-hideaway/pages/poster/index',
  POSTER_VIEW = '/package-hideaway/pages/poster/share/view/index',
  POSTER_SHARE = '/package-hideaway/pages/poster/share/index',
  GAME_RULE = '/package-hideaway/pages/rules/index',
}
export default {
  pages: [...Object.values(PAGES).map((i) => i.slice(1))],
  subPackages: [
    {
      root: 'package-hideaway',
      pages: [...Object.values(HIDEAWAY).map((i) => i.slice(18))],
    },
  ],
  entryPagePath: 'pages/index/index',
  __usePrivacyCheck__: true,
  requiredPrivateInfos: ['getFuzzyLocation', 'chooseAddress'],
  permission: {
    'scope.userFuzzyLocation': {
      desc: '获取附近馥蕾诗门店信息',
    },
    'scope.userLocation': {
      desc: '获取附近馥蕾诗门店信息',
    },
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '馥蕾诗',
    navigationBarTextStyle: 'black',
    navigationStyle: 'custom',
  },
  officialPrivacyAuthorizationShowingGap: 1,

  tabBar: {
    custom: true,
    list: [
      {
        pagePath: PAGES.INDEX.slice(1),
        text: '首页',
      },
      {
        pagePath: PAGES.CATEGORY.slice(1),
        text: '产品',
      },
      {
        pagePath: PAGES.NEWS.slice(1),
        text: '资讯',
      },
      {
        pagePath: PAGES.STORE.slice(1),
        text: '门店',
      },
      {
        pagePath: PAGES.MY.slice(1),
        text: '我的',
      },
    ],
  },
};
