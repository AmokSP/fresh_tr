import request from '@utils/cmsRequest';
export class GlobalService {
  public static async getNotificationPDP(): Promise<any> {
    return request({
      method: 'GET',
      url: `${CMS_API_URL}/global-resource?fields[0]=notificationOnPDP&locale=zh-CN`,
    });
  }

  public static async getHotKeywordsSearch(): Promise<any> {
    return request({
      method: 'GET',
      url: `${CMS_API_URL}/global-resource?populate[hotWordsOnSearchbar]=*`,
    });
  }

  public static async getPlaceholderSearch(): Promise<any> {
    return request({
      method: 'GET',
      url: `${CMS_API_URL}/global-resource?fields[0]=notificationOnSearchbar`,
    });
  }

  public static async getGlobal(): Promise<any> {
    return request({
      url: `${CMS_API_URL}/global-resource?populate=*`,
    });
  }

  public static async getDfs(): Promise<any> {
    return request({
      url: `${CMS_API_URL}/dfs-infos?populate=*`,
    });
  }

  public static async getShowRecommend(): Promise<any> {
    return request({
      method: 'GET',
      url: `${CMS_API_URL}/global-resource?fields[0]=showRecommend`,
    });
  }
}

export default GlobalService;
