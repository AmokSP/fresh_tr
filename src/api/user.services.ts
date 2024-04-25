import request from '@utils/request';
import storage from '@utils/storage';
import Taro from '@tarojs/taro';

export class UserService {
  public static async savePhoneNumber(params: { code: string }): Promise<any> {
    return request({
      url: `${API_URL}/account/savePhoneNumber`,
      data: {
        code: params.code,
      },
      method: 'POST',
    });
  }
  public static async getAvatar(): Promise<any> {
    return request({
      url: `${API_URL}/account/avatar`,
    });
  }

  public static async saveAvatar(params: { filePath: string }): Promise<any> {
    const userInfo = storage.getItem('userInfo');
    const token = userInfo.token || '';
    const header = {
      Authorization: `Bearer ${token}`,
    };
    return new Promise((resolve, reject) => {
      Taro.uploadFile({
        url: `${API_URL}/account/avatar`,
        filePath: params.filePath,
        name: 'file',
        header,
        success: (res) => {
          resolve(res);
        },
        fail: (res) => {
          reject(res);
        },
      });
    });
  }

  public static async signup(params: {
    city: string;
    birthday: string;
    nickname: string;
    prefix: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
  }): Promise<any> {
    return request({
      url: `${API_URL}/account/register`,
      data: {
        city: params.city,
        birthday: params.birthday,
        nickname: params.nickname,
        prefix: params.prefix,
        utmSource: params.utmSource,
        utmMedium: params.utmMedium,
        utmCampaign: params.utmCampaign,
      },
      method: 'POST',
    });
  }

  public static async editProfile(params: {
    city: string;
    birthday: string;
    nickname: string;
    prefix: string;
  }): Promise<any> {
    return request({
      url: `${API_URL}/account/profile`,
      data: {
        city: params.city,
        birthday: params.birthday,
        nickname: params.nickname,
        prefix: params.prefix,
      },
      method: 'PUT',
    });
  }

  public static async getUserInfo(): Promise<any> {
    return request({
      url: `${API_URL}/account/me`,
    });
  }
}
