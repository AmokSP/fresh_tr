import cmsRequest from '@utils/cmsRequest';
import request from '@utils/request';

export class GiftService {
  public static async getGifts(params: { page: Number; pageSize: number }): Promise<any> {
    const { page = 1, pageSize = 10 } = params || {};
    return cmsRequest({
      url: `${CMS_API_URL}/gifts?pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=*&sort[1]=order`,
    });
  }

  public static async getMyGifts(params: {
    page: number;
    pageSize: number;
    status: string;
  }): Promise<any> {
    const { page = 1, pageSize = 10, status = 'create' } = params || {};
    return request({
      url: `${API_URL}/gifts/list/${status}?page=${page}&pageSize=${pageSize}`,
    });
  }

  // 礼物发货
  public static async submitGift(params: { giftId: string }): Promise<any> {
    return request({
      url: `${API_URL}/gifts/submit/${params.giftId}`,
      data: {
        ...params,
      },
      method: 'POST',
    });
  }

  // 礼物领取
  public static async redeemGift(params: { sku: string }): Promise<any> {
    return request({
      url: `${API_URL}/gifts/redeem/${params.sku}`,
      method: 'PUT',
    });
  }
}
