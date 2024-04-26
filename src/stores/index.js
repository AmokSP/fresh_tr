import { create } from 'zustand';
import i18n from '@i18n';
import storage from '@utils/storage';

const useStore = create((set) => ({
  count: 0,
  language: storage.getItem('language'),
  tabbar: {
    activeIndex: 0,
  },
  isLogin: false,
  userInfo: storage.getItem('userInfo') || {},
  hideHomePopup: storage.getItem('hideHomePopup'),
  avatar: '',
  navBarHeight: 0,
  regionCode: storage.getItem('regionCode') || '460200',
  dfs: null, // store tax free store data
  sign: '',
  utmSource: '',
  utmMedium: '',
  utmCampaign: '',
  isFromDFS: false, // 用于标记用户是否通过免税店线下二维码进入
  showRecommend: false, //是否显示咨询
  setUtm: (source, medium, campaign) =>
    set(() => {
      return {
        utmSource: source || '',
        utmMedium: medium || '',
        utmCampaign: campaign || '',
      };
    }),
  setSign: (sign) =>
    set(() => {
      return {
        sign,
      };
    }),
  setShowRecommend: (showRecommend) =>
    set(() => {
      return {
        showRecommend,
      };
    }),
  setFromDFS: (isFromDFS) =>
    set(() => {
      return {
        isFromDFS,
      };
    }),
  setDfs: (dfs) =>
    set(() => {
      return {
        dfs,
      };
    }),
  setRegionCode: (regionCode) =>
    set(() => {
      storage.setItem('regionCode', regionCode);
      return {
        regionCode,
      };
    }),
  setNavBarHeight: (navBarHeight) =>
    set(() => {
      return {
        navBarHeight,
      };
    }),
  setHideHomePopup: (hideHomePopup) =>
    set(() => {
      storage.setItem('hideHomePopup', hideHomePopup);
      return {
        hideHomePopup,
      };
    }),
  setIsLogin: (isLogin) =>
    set(() => {
      return {
        isLogin,
      };
    }),
  setAvatar: (avatar) =>
    set(() => {
      storage.setItem('avatar', avatar);
      return {
        avatar,
      };
    }),
  setUserInfo: (userInfo) =>
    set((state) => {
      const info = {
        ...state.userInfo,
        ...userInfo,
      };
      storage.setItem('userInfo', info);
      return {
        userInfo: info,
      };
    }),

  setLanguage: (lang) =>
    set(() => {
      storage.setItem('language', lang);
      i18n.changeLanguage(lang);
      return {
        language: lang,
      };
    }),
  setTabbarIndex: (index) =>
    set((state) => {
      return {
        tabbar: {
          ...state.tabbar,
          activeIndex: index,
        },
      };
    }),
}));

export default useStore;
