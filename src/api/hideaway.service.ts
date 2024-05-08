import request from '@utils/request';
import cmsRequest from '@utils/cmsRequest';
import storage from '@utils/storage';
import Taro from '@tarojs/taro';
export class HideawayService {
  public static subscribeNotification(templateId: string): Promise<any> {
    return request({
      method: 'PUT',
      url: `${API_URL}/account/notice/${templateId}/subscribe`,
    });
  }
  public static async getHidewayAsset(): Promise<any> {
    return cmsRequest({
      method: 'GET',
      url: `${CMS_API_URL}/hideaway-asset?populate=deep`,
      // url: `${CMS_API_URL}/hideaway-asset?fields[0]=bookcover&fields[1]=bookback&fields[2]=bookpage`,
    });
  }

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
  public static async readPoster(token: string): Promise<{ content: PosterData; success: string }> {
    return request({
      method: 'POST',
      url: `${API_URL}/postcard/received/${token}`,
    });
  }
  public static async checkPhotoStatus(url: string): Promise<any> {
    return request({
      method: 'GET',
      url: `${API_URL}/postcard/mediaStatus`,
      data: {
        url,
      },
    });
  }
  public static async checkPhotos(photos: Photo[]): Promise<
    {
      status: CheckResult;
      id: number;
    }[]
  > {
    return await Promise.all(
      photos.map(
        (i) =>
          new Promise<{
            status: CheckResult;
            id: number;
          }>((resolve, reject) => {
            this.checkPhotoStatus(i.src)
              .then((res) => {
                resolve({
                  ...res,
                  id: i.id,
                });
              })
              .catch(reject);
          })
      )
    );
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
