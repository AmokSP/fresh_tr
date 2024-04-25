import request from '@utils/request';
import Taro from '@tarojs/taro';

const auth = async () => {
  return new Promise((resolve) => {
    Taro.login({
      success: async (res) => {
        const result = await request({
          url: `${API_URL}/account/auth/code`,
          method: 'POST',
          data: {
            code: res.code,
          },
        });
        resolve(result);
      },
    });
  });
};

export { auth };
