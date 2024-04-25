import request from '@utils/cmsRequest';
export class NewsService {
  public static async getNewsInfos(): Promise<any> {
    return request({
      method: 'GET',
      url: `${CMS_API_URL}/newspage?populate[liveStreamingImgs]=*&populate[articles][populate]=*&populate[q_and_a][populate]=*&populate[recommends][populate]=*`,
    });
  }
  public static async getArticleById(id: string): Promise<any> {
    return request({
      method: 'GET',
      url: `${CMS_API_URL}/articles?filters[id][$eq]=${id}`,
    });
  }
  public static async getKolArticleById(id: string): Promise<any> {
    return request({
      method: 'GET',
      url: `${CMS_API_URL}/recommends?filters[id][$eq]=${id}&populate[authorIcon]=*&populate[rotateImgs]=*`,
    });
  }
}

export default NewsService;
