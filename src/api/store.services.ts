import cmsRequest from '@utils/cmsRequest';

export class StoreService {
  public static async getStores(): Promise<any> {
    return cmsRequest({
      url: `${CMS_API_URL}/offline-stores?pagination[pageSize]=200`,
    });
  }
}
