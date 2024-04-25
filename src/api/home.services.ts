import request from '@utils/cmsRequest';

export class HomeService {
  public static async getHome(): Promise<any> {
    return request({
      url: `${CMS_API_URL}/homepage?populate[popupImg]=*&populate[banner][populate]=*&populate[shelves][populate]=*&populate[starProducts][populate]=*&populate[trademarkArticleImg]=*&populate[floatingIcon][populate]=*`,
    });
  }
  public static async getMyPageCards(): Promise<any> {
    return request({
      url: `${CMS_API_URL}/personalbanner?populate=deep`,
    });
  }
}
