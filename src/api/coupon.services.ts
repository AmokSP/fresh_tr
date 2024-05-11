import request from '@utils/request';
import cmsRequest from '@utils/cmsRequest';

export class CouponService {
  public static async getCouponList(params: {
    type: string;
    page: number;
    pageSize: number;
  }): Promise<any> {
    return request({
      url: `${API_URL}/coupon/list/${params.type}`,
      data: {
        page: params.page || 1,
        pageSize: params.pageSize || 20,
      },
    });
  }

  public static async getCouponById(id: string): Promise<any> {
    return cmsRequest({
      url: `${CMS_API_URL}/coupons?populate=deep&filters[name][$eq]=${id}`,
    });
  }

  // 获取优惠券信息
  public static async getCoupon(params: { id: string }): Promise<any> {
    return request({
      url: `${API_URL}/coupon/${params.id}`,
    });
  }

  // 领取优惠券
  public static async bindCoupon(params: { name: string }): Promise<any> {
    return request({
      url: `${API_URL}/coupon/${params.name}/bind`,
      method: 'PUT',
    });
  }

  // 获取核销二维码
  public static async getQRCode(params: { name: string }): Promise<any> {
    return request({
      url: `${API_URL}/coupon/${params.name}/qrCode`,
      data: {
        // release/trial/develop
        env: ENV_VERSION,
      },
      responseType: 'arrayBuffer',
    });
  }

  // 二维码核销
  public static async redeemCoupon(params: any): Promise<any> {
    return request({
      url: `${API_URL}/store/redeem`,
      data: {
        ...params,
      },
      method: 'POST',
    });
  }

  // 二维码核销
  public static async userRedeem(couponId: string, password: string): Promise<any> {
    return request({
      url: `${API_URL}/coupon/${couponId}/redeem`,
      data: { password },
      method: 'POST',
    });
  }
}
