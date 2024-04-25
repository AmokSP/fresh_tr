import request from '@utils/request';
import cmsRequest from '@utils/cmsRequest';

export class LuckyService {
  public static async getRowData(): Promise<any> {
    return cmsRequest({
      url: `${CMS_API_URL}/gift-for-events?populate=deep`,
    });
  }

  public static async getLuckyDraw(name: string): Promise<any> {
    return request({
      url: `${API_URL}/luckydraw/${name}`,
    });
  }
  public static async getLuck(name: string): Promise<any> {
    return request({
      url: `${API_URL}/luckydraw/${name}`,
    });
  }

  public static async getList(params: { page: number; pageSize: number }): Promise<any> {
    return request({
      url: `${API_URL}/luckydraw/list/toBeCollected`,
      data: {
        page: params?.page || 1,
        pageSize: params?.pageSize || 20,
      },
    });
  }

  public static async drawPrize(name: string): Promise<any> {
    return request({
      url: `${API_URL}/luckydraw/${name}`,
      method: 'PUT',
    });
  }
}
