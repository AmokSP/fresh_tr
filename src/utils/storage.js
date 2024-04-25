import Taro from '@tarojs/taro';

const storage = {
  setItem: function (key, value) {
    Taro.setStorageSync(key, JSON.stringify(value));
  },
  getItem: function (key) {
    const value = Taro.getStorageSync(key);
    try {
      return JSON.parse(value);
    } catch (error) {
      return value;
    }
  },
  removeItem: function (key) {
    Taro.removeStorageSync(key);
  },
  clear: function () {
    Taro.clearStorageSync();
  },
};

export default storage;
