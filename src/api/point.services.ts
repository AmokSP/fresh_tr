import request from '@utils/request';

export class PointService {
  public static async getPoints(): Promise<any> {
    return request({
      url: `${API_URL}/collectPoints/info`,
    });
  }

  public static async dailyCheckIn(): Promise<any> {
    return request({
      url: `${API_URL}/collectPoints/dailycheck`,
      method: 'PUT',
    });
  }

  public static async fireTask(params: { name: string }): Promise<any> {
    return request({
      url: `${API_URL}/collectPoints/task/${params.name}`,
      method: 'PUT',
    });
  }
}
