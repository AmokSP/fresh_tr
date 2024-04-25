import cmsRequest from '@utils/cmsRequest';

export class CampainService {
  public static async getCampaign(): Promise<any> {
    return cmsRequest({
      url: `${CMS_API_URL}/compagins?populate=*`,
    });
  }
}
