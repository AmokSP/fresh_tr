import request from '@utils/request';
import storage from '@utils/storage';
import Taro from '@tarojs/taro';
export class HideawayService {
  public static async getShareStatus(): Promise<any> {
    return request({
      method: 'GET',
      url: `${API_URL}/postcard/shareStatus`,
    });
  }
  public static async checkContent(text: string): Promise<any> {
    return request({
      method: 'POST',
      url: `${API_URL}/postcard/checkContent`,
      data: {
        text,
      },
    });
  }
  public static async createPoster(payload: any): Promise<any> {
    return request({
      method: 'POST',
      url: `${API_URL}/postcard/createRelease`,
      data: payload,
    });
  }
  public static async readPoster(token: string): Promise<PosterData> {
    return request({
      method: 'POST',
      url: `${API_URL}/postcard/received/${token}`,
    });
  }
  public static async uploadPhoto(filePath): Promise<{ accessUrl: string }> {
    const userInfo = storage.getItem('userInfo');
    const token = userInfo.token || '';
    const header = {
      Authorization: `Bearer ${token}`,
    };
    return new Promise((resolve, reject) => {
      Taro.uploadFile({
        url: `${API_URL}/postcard/uploadMedia`,
        filePath: filePath,
        name: 'file',
        header,
        success: (res) => {
          resolve(JSON.parse(res.data) as any);
        },
        fail: (res) => {
          reject(res);
        },
      });
    });
  }
}

export default HideawayService;
